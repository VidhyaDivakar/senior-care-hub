type StatCardProps = {
  label: string
  count: number | string
  icon: React.ReactNode
  bg: string
  color: string
}

const StatCard = ({ label, count, icon, bg, color }: StatCardProps) => {
  return (
    <div className={`${bg} rounded-xl p-4 flex items-center gap-3`}>
      <div className={`${color} flex-shrink-0`}>{icon}</div>
      <div>
        <p className="text-xl font-bold text-gray-800 leading-none">{count}</p>
        <p className="text-gray-500 text-sm mt-0.5">{label}</p>
      </div>
    </div>
  )
}

export default StatCard
