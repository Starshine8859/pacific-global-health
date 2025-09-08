import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminContactPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Contact Submissions</h1>
          <p className="text-sm text-muted-foreground">Review and manage contact form enquiries</p>
        </div>
        <Input placeholder="Search enquiries" className="w-64" />
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {[1,2,3].map((i) => (
          <Card key={i} className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-foreground">Jane Doe</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-1">
              <p>Email: jane{i}@example.com</p>
              <p>Subject: Partnership enquiry</p>
              <p>Received: 2024-09-0{i}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-6 text-center text-sm text-muted-foreground">End of list</CardContent>
      </Card>
    </div>
  )
}


