export default function AdminDashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="text-gray-600">Quick overview and stats go here.</p>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg border">Metric A</div>
        <div className="p-4 bg-white rounded-lg border">Metric B</div>
        <div className="p-4 bg-white rounded-lg border">Metric C</div>
      </div>
    </div>
  )
}


