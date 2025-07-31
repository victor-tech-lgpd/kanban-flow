import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../../types';
import { Card } from '../ui/Card';
import { useEditModalStore } from '../../store/modal-store';

interface Props {
  task: Task;
}

function TaskCard({ task }: Props) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: { type: 'Task', task },
  });

  const openModal = useEditModalStore((state) => state.openModal);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30 bg-gray-200 p-4 rounded-xl border-2 border-rose-500 cursor-grab relative"
      />
    );
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => openModal(task)}
      className="p-4 rounded-xl cursor-grab relative"
    >
      <p className="whitespace-pre-wrap">{task.content}</p>
    </Card>
  );
}

export default TaskCard;