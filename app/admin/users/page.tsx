import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Users</h1>
          <p className="text-sm text-muted-foreground">Manage platform users</p>
        </div>
        <div className="flex items-center gap-2">
          <Input placeholder="Search users" className="w-56" />
          <Button>Add User</Button>
        </div>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-3">Email</th>
                  <th className="text-left px-4 py-3">Role</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-right px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-4 py-3 text-foreground">admin@admin.com</td>
                  <td className="px-4 py-3">admin</td>
                  <td className="px-4 py-3">active</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Button variant="secondary" size="sm">Edit</Button>
                    <Button variant="destructive" size="sm">Remove</Button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-foreground">user1@example.com</td>
                  <td className="px-4 py-3">user</td>
                  <td className="px-4 py-3">active</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Button variant="secondary" size="sm">Edit</Button>
                    <Button variant="destructive" size="sm">Remove</Button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-foreground">user2@example.com</td>
                  <td className="px-4 py-3">user</td>
                  <td className="px-4 py-3">inactive</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Button variant="secondary" size="sm">Edit</Button>
                    <Button variant="destructive" size="sm">Remove</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


