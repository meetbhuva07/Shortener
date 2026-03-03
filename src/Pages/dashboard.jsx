import React, { useState } from "react";
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import Error from "@/components/error";

const Dashboard = () => {
  const [searchQuery, setsearchQuery] = useState("");
  return (
    <div className="flex flex-col gap-8">
      {true && <BarLoader width={"100%"} color="#6B7280" />}

      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gray-900/50 ">
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>0</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 ">
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>0</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex  justify-between">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <Button>Create Link</Button>
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter links..."
          value={searchQuery}
          onChange={(e) => setsearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2  p-1"/>
      </div>
      {/* <Error message={Error.message} /> */}
    </div>
  );
};

export default Dashboard;
