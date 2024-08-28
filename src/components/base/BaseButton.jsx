export default function BaseButton({
  buttonText,
  type,
  onClick,
  customClasses,
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`rounded-md text-center py-2 bg-primary text-white font-semibold border-none ${customClasses}`}
    >
      {buttonText}
    </button>
  );
}
