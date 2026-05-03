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
import Device from "@/components/device-stats";

const Link = () => {
  const { id } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, {
    id,
    user_id: user?.id,
  });

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

  if (error) navigate("/dashboard");

  let link = url?.custom_url ? url?.custom_url : url?.short_url;

  const downloadimage = () => {
    if (!url?.qr) return;
    const a = document.createElement("a");
    a.href = url.qr;
    a.download = `${url.title || "qr-code"}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader width={"100%"} color={"#6B7280"} />
      )}

      {/* 🔥 MAIN GRID - NO EMPTY SPACE FIX */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch min-h-[85vh]">
        {/* 🔗 LEFT SIDE */}
        <div className="pl-5 flex flex-col justify-between h-full gap-8 text-center lg:text-left">
          {/* TOP CONTENT */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl sm:text-5xl pl-5 font-extrabold break-words">
              {url?.title}
            </h1>

            <a
              href={`https://trimrr.in/${link}`}
              target="_blank"
              className="text-2xl pl-5 sm:text-3xl font-bold text-blue-400 break-all hover:underline"
            >
              {`https://trimrr.in/${link}`}
            </a>

            <a
              href={url?.original_url}
              target="_blank"
              className="flex items-center pl-5 justify-center lg:justify-start gap-2 text-base sm:text-lg break-all hover:underline"
            >
              <LinkIcon className="size-4" />
              {url?.original_url}
            </a>

            <span className="text-sm pl-5 text-gray-400">
              {url && new Date(url.created_at).toLocaleString()}
            </span>

            {/* BUTTONS */}
            <div className="flex flex-wrap pl-2 justify-center lg:justify-start gap-2">
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
          </div>
          {/* 🔥 QR - RESPONSIVE + CENTER / RIGHT CONTROL */}
          {url?.qr && (
            <div className="w-full flex justify-center lg:justify-center items-center mt-0">
              <div
                className="
      w-[80%] sm:w-[65%] md:w-[55%] lg:w-[520px] xl:w-[560px]
      transition-all duration-300
      flex justify-center items-center
    "
              >
                <img
                  src={url.qr}
                  alt="QR Code"
                  className="
          w-full
          aspect-square
          object-contain
          rounded-2xl
          ring-4 ring-blue-500
          p-5 md:p-6
          bg-gray-900/60
          shadow-2xl
          hover:scale-105 transition-transform duration-300
        "
                />
              </div>
            </div>
          )}{" "}
        </div>

        {/* 📊 RIGHT SIDE */}
        <Card className="w-full h-full bg-gray-900/50 border border-blue-400/30 shadow-lg rounded-xl flex flex-col">
          <CardHeader>
            <CardTitle className="text-2xl sm:text-3xl font-extrabold text-center lg:text-left">
              Stats Overview
            </CardTitle>
          </CardHeader>

          {stats && stats.length ? (
            <CardContent className="flex flex-col gap-10 flex-1 overflow-y-auto">
              {/* TOTAL CLICKS */}
              <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-xl p-4 flex flex-col items-center lg:items-start border border-gray-700">
                <p className="text-sm text-gray-400">Total Clicks</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  {stats.length}
                </h2>
              </div>

              {/* LOCATION */}
              <div className="bg-[#111827] p-3 rounded-xl border border-gray-700 flex-1">
                <h3 className="text-base font-semibold mb-2 text-center lg:text-left">
                  Location Data
                </h3>
                <Location stats={stats} />
              </div>

              {/* DEVICE */}
              <div className="bg-[#111827] p-3 rounded-xl border border-gray-700 flex-1">
                <h3 className="text-base font-semibold mb-2 text-center lg:text-left">
                  Device Info
                </h3>
                <Device stats={stats} />
              </div>
            </CardContent>
          ) : (
            <CardContent className="text-center text-gray-400 py-6 flex-1">
              {loadingStats ? "Loading Statistics..." : "No Statistics yet"}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default Link;
