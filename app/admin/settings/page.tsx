import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Configure application preferences</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Organization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="orgName">Name</Label>
              <Input id="orgName" placeholder="Pacific Global Health" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="orgEmail">Contact Email</Label>
              <Input id="orgEmail" type="email" placeholder="info@pacificglobal.org" />
            </div>
            <Button>Save</Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Appearance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            Uses global theme toggle in the header. Additional appearance options can be added here.
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


