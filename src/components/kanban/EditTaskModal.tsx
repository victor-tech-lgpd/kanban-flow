import { useEditModalStore } from '../../store/modal-store';
import { Button } from '../ui/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Task } from '../../types';

async function updateTask(task: Task) {
  const response = await fetch(`http://localhost:3001/tasks/${task.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!response.ok) throw new Error('Failed to update task');
  return response.json();
}

function EditTaskModal() {
  const { isOpen, closeModal, task } = useEditModalStore();
  const queryClient = useQueryClient();
  const [content, setContent] = useState(task?.content || '');

  const mutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boardData'] });
      closeModal();
    },
  });

  if (!isOpen || !task) return null;

  const handleSave = () => {
    mutation.mutate({ ...task, content });
  };

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 bg-black/50 z-50 grid place-items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Editar Tarefa</h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded-md mb-4"
          rows={5}
        />
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={closeModal}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar</Button>
        </div>
      </div>
    </div>
  );
}

export default EditTaskModal;