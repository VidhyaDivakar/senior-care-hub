type StatCardProps = {
  label: string
  count: number | string
  icon: React.ReactNode
  bg: string
  color: string
}

const StatCard = ({ label, count, icon, bg, color }: StatCardProps) => {
  return (
    <div className={`${bg} rounded-xl p-6 text-center`}>
      <div className={`flex justify-center mb-3 ${color}`}>{icon}</div>
      <p className="text-3xl font-bold text-gray-800 mb-1">{count}</p>
      <p className="text-gray-500 font-medium">{label}</p>
    </div>
  )
}

export default StatCard
