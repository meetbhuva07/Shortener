import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import Error from "@/components/error";
import useFetch from "@/hooks/use-fetch";
import { getUrls } from "@/db/apiUrls";
import { UrlState } from "@/context";
import { getClicksForUrls } from "@/db/apiClick";
import LinkCard from "@/components/link-card";
import CreateLink from "@/components/create-Link";

const Dashboard = () => {
  const [searchQuery, setsearchQuery] = useState("");

  const { user } = UrlState();

  const {
    loading,
    error,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);

  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
  }, []);

  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6 sm:gap-8 px-2 sm:px-0">

      {/* 🔄 Loader */}
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#6B7280" />
      )}

      {/* 📊 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="bg-gray-900/50">
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{urls?.length || 0}</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50">
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{clicks?.length || 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* 🧾 Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl sm:text-4xl font-extrabold">My Links</h1>
        <CreateLink  />
      </div>

      {/* 🔍 Search */}
      <div className="relative w-full">

  <Input
    type="text"
    placeholder="Filter links..."
    value={searchQuery}
    onChange={(e) => setsearchQuery(e.target.value)}
    className="pr-10 w-full"
  />

  <Filter className="absolute top-1/2 -translate-y-1/2 right-3 size-5 text-gray-400" />

</div>

      {/* ❌ Error */}
      {error && <Error message={error?.message} />}

      {/* 🔗 Links */}
      <div className="flex flex-col gap-4 ">
        {(filteredUrls || []).map((url, i) => (
          <LinkCard key={i} url={url} fetchUrls={fnUrls} className="items-center" />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;