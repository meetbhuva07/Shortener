import { UrlState } from "@/context";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./error";
import { Card } from "./ui/card";

import * as yup from "yup";
import useFetch from "@/hooks/use-fetch";
import QRCode from "react-qrcode-logo";
import { createUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();
  const ref = useRef();

  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .url("Must be a valid URL")
      .required("Long URL is required"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl, { ...formValues, user_id: user?.id });

  useEffect(() => {
    if (data && !error) {
      navigate(`/links/${data[0].id}`);
    }
  }, [data, error, navigate]);

  const createNewLink = async () => {
    setErrors({});

    try {
      await schema.validate(formValues, { abortEarly: false });

      const canvas = ref.current?.canvasRef?.current;
      let blob = null;

      if (canvas) {
        blob = await new Promise((resolve) => canvas.toBlob(resolve));
      }

      await fnCreateUrl(blob);
    } catch (e) {
      const newErrors = {};

      if (e.inner) {
        e.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
      }

      setErrors(newErrors);
    }
  };

  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(open) => {
        if (!open) setSearchParams({});
      }}
    >
      <DialogTrigger asChild>
        <Button>Create New Link</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">
            Create New Link
          </DialogTitle>
        </DialogHeader>

        {formValues.longUrl && (
          <div className="flex justify-center">
            <QRCode value={formValues.longUrl} size={120} ref={ref} />
          </div>
        )}

        <Input
          id="title"
          placeholder="Short Link's Title"
          value={formValues.title}
          onChange={handleChange}
        />
        {errors.title && <Error message={errors.title} />}

        <Input
          id="longUrl"
          placeholder="Enter your Loooong URL"
          value={formValues.longUrl}
          onChange={handleChange}
        />
        {errors.longUrl && <Error message={errors.longUrl} />}

        <div className="flex items-center gap-2">
          <Card className="p-2 bg-slate-950 text-white">
            trimrr.in
          </Card>

          <Input
            id="customUrl"
            placeholder="Custom Link (optional)"
            value={formValues.customUrl}
            onChange={handleChange}
          />
        </div>

        {error && <Error message={error.message} />}

        <DialogFooter className="sm:justify-start">
          <Button
            disabled={loading}
            onClick={createNewLink}
            className="w-full sm:w-auto"
          >
            {loading ? (
              <BeatLoader size={10} color="#fff" />
            ) : (
              "Create"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;