import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function AdminTrainingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Training Applications</h1>
          <p className="text-sm text-muted-foreground">Review and manage training program applications</p>
        </div>
        <Input placeholder="Search applications" className="w-64" />
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {[1,2,3,4].map((i) => (
          <Card key={i} className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-foreground">Applicant #{i}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>Email: applicant{i}@example.com</p>
              <p>Program: {i % 2 === 0 ? "Internship" : "Elective"}</p>
              <div className="pt-2">
                <Button size="sm" variant="secondary" className="mr-2">View</Button>
                <Button size="sm">Mark Reviewed</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


