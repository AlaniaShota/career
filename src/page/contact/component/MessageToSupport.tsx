"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as yup from "yup";

import { messageBlockTitle, messageSubTitle } from "./constanta";
import { successVariants } from "../../../utils/animations";
import Button from "../../../component/Button";

type FormData = yup.InferType<typeof messageSchema>;

const messageSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  subject: yup.string().required("Subject is required"),
  category: yup.string().required("Category is required"),
  message: yup.string().min(10, "Message is too short").required(),
  agreement: yup.boolean().oneOf([true], "You must accept the policy"),
});
export default function MessageToSupport() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data: FormData = {
      fullName: String(formData.get("fullName")),
      email: String(formData.get("email")),
      subject: String(formData.get("subject")),
      category: String(formData.get("category")),
      message: String(formData.get("message")),
      agreement: formData.get("agreement") === "on",
    };

    try {
      setErrors({});
      await messageSchema.validate(data, { abortEarly: false });

      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 1500));
      setIsLoading(false);
      setIsSuccess(true);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const formErrors: Record<string, string> = {};
        err.inner.forEach((e) => {
          if (e.path) formErrors[e.path] = e.message;
        });
        setErrors(formErrors);
      }
    }
  };

  return (
    <div className="text-gstore-midnight p-6 w-2/3 bg-white rounded-2xl shadow-sm border flex flex-col gap-6">
      <div >
        <h1 className="text-2xl md:text-3xl mb-3">{messageBlockTitle}</h1>
        <p className="text-lg text-gray-700 mt-1">{messageSubTitle}</p>
      </div>

      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            variants={successVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-gstore-blue border border-gstore-blue rounded-xl p-6 text-center"
          >
            <p className="text-soft-sky font-medium text-lg">
              Message sent successfully!
            </p>
            <p className="text-sm text-soft-sky">
              We’ll get back to you within 24–48 hours.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Field label="Full name" name="fullName" error={errors.fullName} />

            <Field
              label="Email address"
              name="email"
              type="email"
              error={errors.email}
            />

            <Field label="Subject" name="subject" error={errors.subject} />

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Category</label>
              <select name="category" className="border rounded-xl px-4 py-2">
                <option value="">Select category</option>
                <option>General question</option>
                <option>Account & login</option>
                <option>Job posting issue</option>
                <option>Partnership</option>
                <option>Other</option>
              </select>
              {errors.category && (
                <span className="text-xs text-red-500">{errors.category}</span>
              )}
            </div>

            <div className="md:col-span-2 flex flex-col gap-1">
              <label className="text-sm font-medium">Message</label>
              <textarea
                name="message"
                rows={5}
                className="border rounded-xl px-4 py-2"
              />
              {errors.message && (
                <span className="text-xs text-red-500">{errors.message}</span>
              )}
            </div>

            <div className="md:col-span-2 flex items-start gap-2">
              <input type="checkbox" name="agreement" />
              <p className="text-sm text-gray-600">
                I agree to the processing of my data according to the{" "}
                <span className="underline cursor-pointer">Privacy Policy</span>
                .
              </p>
            </div>
            {errors.agreement && (
              <span className="text-xs text-red-500 md:col-span-2">
                {errors.agreement}
              </span>
            )}

            <div className="md:col-span-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl"
              >
                {isLoading ? "Sending..." : "Send message"}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <input name={name} type={type} className="border rounded-xl px-4 py-2" />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
