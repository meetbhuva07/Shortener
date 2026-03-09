import { UrlState } from "@/context";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogClose,
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

const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();

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
      .url("Must be a valid URL ")
      .required("Long URL is required"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  return (
      <Dialog defaultOpen={longLink}
      onOpenChange={(res) => {if(res)setSearchParams ({})} }>
        <DialogTrigger>
          <Button>Create New Link</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Create New{" "}
            </DialogTitle>
          </DialogHeader>
          <Input
            id="title"
            placeholder="Short Link's Title"
            value={formValues.title}
            onChange={handleChange}
          />
          <Error message={"some error"} />

          <Input
            id="title"
            placeholder="Enter your Loooong URL"
            value={formValues.longUrl}
            onChange={handleChange}
          />
          <Error message={"some error"} />

          <div className="flex items-center gap-2">
            <Card className="p-2 bg-slate-950">trimrr.in</Card> /
            <Input
              id="title"
              placeholder="Custom Link (optional)"
              value={formValues.customUrl}
              onChange={handleChange}
            />
          </div>
          <Error message={"some error"} />
          <DialogFooter className="sm:justify-start">
            <DialogClose>
              <Button className="w-full sm:w-auto">Create</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog> 
  );
};

export default CreateLink;
