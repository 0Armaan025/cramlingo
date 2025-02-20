"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
  id: string;
  symbol: string;
  name: string;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, symbol, name }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-2 bg-gray-200 rounded mt-2 cursor-grab active:cursor-grabbing"
    >
      {symbol} - {name}
    </li>
  );
};

export default SortableItem;
