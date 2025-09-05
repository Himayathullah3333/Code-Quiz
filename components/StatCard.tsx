interface StatCardProps {
  title: string;
  value: string | number | undefined;
  variant?: 'glass' | 'white';
}

const StatCard = ({ title, value, variant = 'glass' }: StatCardProps) => {
  const containerClass =
    variant === 'white'
      ? 'rounded-2xl p-6 md:p-8 bg-white text-black shadow-xl text-center'
      : 'card text-center text-white';

  const titleClass =
    variant === 'white'
      ? 'uppercase text-sm text-black'
      : 'uppercase text-sm text-white drop-shadow';

  const valueClass =
    variant === 'white'
      ? 'mt-2 block text-3xl font-extrabold text-black'
      : 'mt-2 block text-3xl font-extrabold text-white drop-shadow';

  return (
    <div className={containerClass}>
      <h3 className={titleClass}>{title}</h3>
      <span className={valueClass}>{value}</span>
    </div>
  );
};

export default StatCard;
