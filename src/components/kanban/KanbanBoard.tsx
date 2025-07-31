import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Column, Task } from '../../types';
import KanbanColumn from './KanbanColumn';
import TaskCard from './TaskCard';
import EditTaskModal from './EditTaskModal';

const fetchBoardData = async (): Promise<{ columns: Column[]; tasks: Task[] }> => {
  const [columnsRes, tasksRes] = await Promise.all([
    fetch('http://localhost:3001/columns'),
    fetch('http://localhost:3001/tasks'),
  ]);
  if (!columnsRes.ok || !tasksRes.ok) {
    throw new Error('Falha ao buscar dados do quadro');
  }
  const columns = await columnsRes.json();
  const tasks = await tasksRes.json();
  return { columns, tasks };
};

function KanbanBoard() {
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ['boardData'],
    queryFn: fetchBoardData,
  });

  const columns = useMemo(() => {
    if (!data) return [];
    const tasksByColumn: { [key: string]: Task[] } = data.tasks.reduce(
      (acc, task) => {
        if (!acc[task.columnId]) acc[task.columnId] = [];
        acc[task.columnId].push(task);
        return acc;
      },
      {} as { [key: string]: Task[] }
    );

    const enrichedColumns: Column[] = data.columns
      .map((col: Column) => ({
        ...col,
        tasks: (tasksByColumn[col.id] || []).sort((a, b) => a.order - b.order),
      }))
      .sort((a, b) => a.order - b.order);

    return enrichedColumns;
  }, [data]);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const mutation = useMutation({
    mutationFn: async (updatedTask: Task) => {
      const response = await fetch(`http://localhost:3001/tasks/${updatedTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) throw new Error('Failed to update task');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boardData'] });
    },
  });

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Ocorreu um erro: {(error as Error).message}</div>;

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
      return;
    }
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveColumn(null);
    setActiveTask(null);
    if (!over || active.id === over.id) return;

    if (active.data.current?.type === 'Task') {
      const task = active.data.current.task as Task;
      const targetColumnId = over.data.current?.type === 'Column' ? over.id : over.data.current?.task.columnId;
      if (task.columnId !== targetColumnId) {
        mutation.mutate({ ...task, columnId: targetColumnId as string, order: 1 });
      }
    } else if (active.data.current?.type === 'Column') {
      const oldIndex = columns.findIndex((col) => col.id === active.id);
      const newIndex = columns.findIndex((col) => col.id === over.id);
      const newColumns = arrayMove(columns, oldIndex, newIndex);
      // Update column order on server (placeholder)
      console.log('New column order:', newColumns);
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    // Log for debugging; implement visual feedback if needed
    console.log('Dragging over:', { active: active.id, over: over.id });
  }

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-10">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <KanbanColumn key={col.id} column={col} tasks={col.tasks} />
            ))}
          </SortableContext>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <KanbanColumn column={activeColumn} tasks={activeColumn.tasks} />
            )}
            {activeTask && <TaskCard task={activeTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
      <EditTaskModal />
    </div>
  );
}

export default KanbanBoard;