import { getClicksForUrl } from "@/db/apiClick";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";
import { UrlState } from "@/context";
import { Copy, Download, LinkIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Location from "@/components/location-stats";
import { Link as RouterLink } from "react-router-dom";

const Link = () => {
  const { id } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();
  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
    fnStats();
  }, []);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url?.short_url;
  }

  const downloadimage = () => {
    if (!url?.qr) return;

    const anchor = document.createElement("a");
    anchor.href = url.qr;
    anchor.download = `${url.title || "qr-code"}.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color={"#6B7280"} />
      )}

      <div className="flex flex-col gap-8 sm:flex-row justify-between ">
        <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
          <span className="text-6xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span>

          <a
            href={`https://trimrr.in/${link}`}
            target="_blank"
            className="text-3xl sm:text-4xl font-extrabold hover:underline cursor-pointer text-blue-400"
          >
            {`https://trimrr.in/${link}`}
          </a>

          <a
            href={url?.original_url}
            target="_blank"
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>

          <span className="flex items-end font-extralight text-sm">
            {url && new Date(url.created_at).toLocaleString()}
          </span>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() =>
                navigator.clipboard.writeText(
                  `https://trimrr.in/${url?.short_url}`,
                )
              }
            >
              <Copy />
            </Button>

            <Button variant="ghost" onClick={downloadimage}>
              <Download />
            </Button>

            <Button
              variant="ghost"
              onClick={() => fnDelete().then(() => navigate("/dashboard"))}
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash2 />
              )}
            </Button>
          </div>

          {url?.qr && (
            <img
              src={url.qr}
              alt="QR Code"
              className="w-full self-center sm:self-start ring ring-blue-500 p-1 object-contain rounded-lg "
            />
          )}
        </div>

        <Card className=" sm:w-3/5 bg-gray-900/50 border-blue-400">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
          </CardHeader>
          {stats && stats?.length ? (
            <CardContent className="flex flex-col gap-6 ">
              <Card className="bg-gray-900/50">
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats?.length || 0}</p>
                </CardContent>
              </Card>

              <CardTitle>Location Data</CardTitle>
              <Location stats={stats} />

              <CardTitle>Device Info</CardTitle>
              {/* <DeviceStats stats={stats} /> */}
            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false
                ? "No Statistics yet"
                : "Loading Statistics.."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default Link;
