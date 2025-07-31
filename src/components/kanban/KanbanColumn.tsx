import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMemo } from 'react';
import { Column, Task } from '../../types';
import TaskCard from './TaskCard';
import { Card } from '../ui/Card';

interface Props {
  column: Column;
  tasks: Task[];
}

function KanbanColumn({ column, tasks }: Props) {
  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: { type: 'Column', column },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-gray-200 w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col opacity-40 border-2 border-rose-500"
      />
    );
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="w-[350px] h-[500px] max-h-[500px] flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        className="bg-gray-100 text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-b-2 flex items-center justify-between"
      >
        {column.title}
        <span className="text-sm text-gray-500">{tasks.length}</span>
      </div>
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </Card>
  );
}

export default KanbanColumn;