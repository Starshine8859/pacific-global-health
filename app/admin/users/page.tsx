export default function AdminUsersPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Users</h1>
      <p className="text-gray-600">Manage platform users.</p>
      <div className="p-4 bg-white rounded-lg border">
        <p className="text-sm text-gray-500">Example list placeholder</p>
        <ul className="list-disc pl-6 mt-2">
          <li>admin@admin.com (admin)</li>
          <li>user1@example.com</li>
          <li>user2@example.com</li>
        </ul>
      </div>
    </div>
  )
}


