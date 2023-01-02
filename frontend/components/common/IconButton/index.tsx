interface IconButtonProps {
  icon: React.ReactNode;
  visible?: boolean;
  onClick: () => void;
}

export default function IconButton({ icon, visible = true, onClick }: IconButtonProps) {
  return (
    <button
      aria-label="button"
      type="button"
      onClick={onClick}
      style={{ visibility: visible ? 'visible' : 'hidden' }}
    >
      {icon}
    </button>
  );
}
