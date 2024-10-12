"use client";
/* eslint-disable @typescript-eslint/no-explicit-any*/
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  prefix: z.string(),
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  institution: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postcode: z.string(),
  email: z.string().email(),
  abstractId: z.string().optional(),
  feeOption: z.string(),
  shortCourseOnNonlinearAcoustics: z.string(),
  shortCourseOnComputationalModelling: z.string(),
  tickets: z.number(),
  dietaryRestrictions: z.string(),
  dietarySpecificRequirements: z.string().optional(),
});
const RegistrationForm = () => {
  const [isSpecificRequirements, setIsSpecificRequirements] = useState(false);
  const [feeOption, setFeeOption] = useState("No fee option selected yet");
  const [totalPaymentDue, setTotalPaymentDue] = useState(0);
  type FieldType = {
    name: string;
    value: string;
    onChange: (value: string) => void;
  };
  // prefix list for contact information
  const prefixList = ["Dr.", "Mr.", "Ms.", "Prof."];
  // input list for contact information
  const inputList = [
    { label: "First Name", name: "firstName", placeholder: "Please enter your first name",required:true},
    { label: "Middle Name", name: "middleName", placeholder: "Please enter your middle name", required:false },
    { label: "Last Name", name: "lastName", placeholder: "Please enter your last name",required:true },
    { label: "Institution", name: "institution", placeholder: "Please enter your institution",required:true },
    { label: "Address", name: "address", placeholder: "Please enter your address",required:true },
    { label: "City", name: "city", placeholder: "Please enter your city",required:true },
    { label: "State", name: "state", placeholder: "Please enter your state",required:true },
    { label: "Country", name: "country", placeholder: "Please enter your country",required:true },
    { label: "Postcode", name: "postcode", placeholder: "Please enter your postcode",required:true },
    { label: "Email", name: "email", placeholder: "Please enter your email",required:true },
    { label: "Abstract ID(If Presenting)", name: "abstractId", placeholder: "Please enter your abstract ID",required:false },
  ];
  // fee option list
  const feeOptionList = [
    "$450.00 Full Program (Early registration)",
    "$550.00 Full Program (On site registration)",
    "$200.00 Full Program (Student early registration)",
    "$250.00 Full Program (Student registration)",
    "$150.00 one day registration (Monday 30th June)",
    "$150.00 one day registration (Tuesday 1st July)",
    "$150.00 one day registration (Wednesday 2nd July)",
    "$150.00 one day registration (Thursday 3rd July)",
  ];
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  function handleSingleCheckboxChange(field: FieldType, item: string) {
    // 处理特殊的选择逻辑
    return {
      checked: field.value === item,
      onCheckedChange: (checked: boolean) => {
        if(field.name === "feeOption"){
          setFeeOption(checked?item:"No fee option selected yet");
        }
        if (field.name === "dietaryRestrictions") {
          setIsSpecificRequirements(checked && item === "other");
        }
        return checked ? field.onChange(item) : field.onChange("");
      },
    };
  }
  function makeCheckboxList(field: FieldType, list: string[], flexDirection: string) {
    return (
      <div className={flexDirection === "row" ? "flex items-center" : ""}>
        {list.map((item, index) => {
          return (
            <div
              key={item}
              className={
                (flexDirection !== "row" ? "mt-2" : "") + " flex items-center"
              }
            >
              <FormControl
                className={`${
                  index === 0 || flexDirection !== "row" ? "ml-0" : "ml-5"
                }`}
              >
                <Checkbox {...handleSingleCheckboxChange(field, item)} />
              </FormControl>
              <FormLabel className={"ml-2"}>{item}</FormLabel>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className="w-[60vw] mx-auto mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h1 className="text-2xl font-bold">Contact information</h1>
          <FormField
            control={form.control}
            name="prefix"
            render={({ field }) => (
              <FormItem>{makeCheckboxList(field, prefixList, "row")}</FormItem>
            )}
          />
          {inputList.map((item) => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name as any}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={item.required ? "required font-semibold" : "font-semibold"}>
                    {item.label}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={item.placeholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <h1 className="text-2xl font-bold">Registration Fee Options</h1>
          <FormField
            control={form.control}
            name="feeOption"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required font-semibold">
                  Select your ISNA 2025 Symposium registration
                </FormLabel>
                {makeCheckboxList(field, feeOptionList, "col")}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shortCourseOnNonlinearAcoustics"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required font-semibold">
                  I plan to attend the Short Course on Nonlinear Acoustics on
                  Monday 30 June (morning)
                </FormLabel>
                {makeCheckboxList(field, ["Yes", "No"], "row")}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shortCourseOnComputationalModelling"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required font-semibold">
                  I plan to attend the Short Course on Computational Modelling
                  on Monday 4 July
                </FormLabel>
                {makeCheckboxList(field, ["Yes", "No"], "row")}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tickets"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required font-semibold">
                  The banquet will take place in the Jingling Hotel. Start time
                  is 19:00
                </FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    I am purchasing{" "}
                    <Input
                      className="w-[60px] ml-2 mr-2"
                      type="number"
                      {...field}
                      onChange={(e) => {
                        if (Number(e.target.value) >= 0) {
                          setTotalPaymentDue(Number(e.target.value));
                          field.onChange(Number(e.target.value));
                        }
                      }}
                      value={totalPaymentDue.toString()}
                    />{" "}
                    ticket(s) to the Banquet at $80 each.
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dietaryRestrictions"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required font-semibold">
                  Dietary Restrictions
                </FormLabel>
                {makeCheckboxList(
                  field,
                  ["None", "Vegetarian", "other"],
                  "col"
                )}
              </FormItem>
            )}
          />
          {isSpecificRequirements && (
            <FormField
              control={form.control}
              name="dietarySpecificRequirements"
              render={({ field }) => (
                <FormItem>
                  <Input placeholder="please specify" {...field} />
                </FormItem>
              )}
            />
          )}
          <h1 className="text-2xl font-bold">
            Below is your fee summary and total payment due
          </h1>
          <div>ISNA Registration Fee: {feeOption}</div>
          <div>
            Total Payment Due: {totalPaymentDue * 80 + Number(feeOption.substring(1, 4)) || 0}
          </div>
          <div className="w-full flex justify-center">
          <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegistrationForm;

