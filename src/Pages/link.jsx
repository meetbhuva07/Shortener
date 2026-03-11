import { getClicksForUrl } from "@/db/apiClick";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import React, { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { UrlState } from "@/context";
import { Link2Icon, LinkIcon } from "lucide-react";

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

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader width={"100%"} color={"#6B7280"} />
      )}

      <div className="flex flex-col gap-8 sm:flex-row justify-between">
        <div className="flex flex-col items-start gap-8 rounded-lg  sm:w-2/5">
          <span>{url?.title}</span>
          <a href={`https://trimrr.in/${link}`} target="_blank">
            https://trimrr.in{link}
          </a>
          
          <a href={url?.original_url} target="_blank">
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>

          <span>{ new Date(url?.created_at).toLocaleString() }</span>
        </div>

        <div className="sm:w-3/5"></div>
      </div>
    </>
  );
};

export default Link;
