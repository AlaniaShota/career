"use client";
import { useSearchParams } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { jsPDF } from "jspdf";
import { motion } from "framer-motion";
import { cardItem, hoverTransition, listContainer } from "./utils/animations";
import { useApplyStore, type Application } from "./store/applyStore";

type FormData = yup.InferType<typeof schema>;

const schema = yup.object({
  name: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  number: yup.string().required("Phone number is required"),
  linkedin: yup.string().url().nullable().optional(),
  portfolio: yup.string().url().nullable().optional(),
  cv: yup
    .mixed<FileList>()
    .test("required", "CV is required", (value) => value && value.length > 0),
});

export default function ApplyPage() {
  const [params] = useSearchParams();
  const jobId = params.get("jobId");
  const jobTitle = params.get("title");

  const { addApplication } = useApplyStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const generatePDF = (
    data: FormData & { jobId: string | null; title: string | null }
  ) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Job Application: ${data.title || "N/A"}`, 10, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${data.name} ${data.lastName}`, 10, 30);
    doc.text(`Email: ${data.email}`, 10, 40);
    doc.text(`Phone: ${data.number}`, 10, 50);
    if (data.linkedin) doc.text(`LinkedIn: ${data.linkedin}`, 10, 60);
    if (data.portfolio) doc.text(`Portfolio: ${data.portfolio}`, 10, 70);
    if (data.cv?.[0]) doc.text(`CV File: ${data.cv[0].name}`, 10, 80);
    doc.save(`${data.name}_${data.lastName}_Application.pdf`);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const app: Application = {
      jobId,
      jobTitle,
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      number: data.number,
      linkedin: data.linkedin || undefined,
      portfolio: data.portfolio || undefined,
      cvFileName: data.cv?.[0]?.name,
    };

    addApplication(app);
    generatePDF({ jobId, title: jobTitle, ...data });
  };

  const MotionInput = (name: keyof FormData, label: string, type = "text") => (
    <motion.div
      className="form__group relative"
      variants={cardItem}
      whileHover={{ scale: 1.01, boxShadow: "0 8px 15px rgba(0,0,0,0.2)" }}
      transition={hoverTransition}
    >
      <input
        type={type}
        placeholder=" "
        {...register(name)}
        className="form__field rounded-2xl"
      />
      <label className="form__label">{label}</label>
      {errors[name] && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-sm mt-1"
        >
          {errors[name]?.message}
        </motion.p>
      )}
    </motion.div>
  );

  return (
    <motion.div
      className="p-6 max-w-xl mx-auto bg-linear-to-r from-gstore-midnight to-gstore-blue rounded-3xl mt-10 text-white shadow-xl"
      variants={listContainer}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-2xl font-bold mb-6">{jobTitle}</h1>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
        variants={listContainer}
      >
        {MotionInput("name", "First Name *")}
        {MotionInput("lastName", "Last Name *")}
        {MotionInput("email", "Email *", "email")}
        {MotionInput("number", "Phone Number *", "tel")}
        {MotionInput("linkedin", "LinkedIn URL", "url")}
        {MotionInput("portfolio", "Portfolio URL", "url")}

        {/* CV Upload */}
        <motion.div
          className="form__group relative"
          variants={cardItem}
          whileHover={{ scale: 1.01, boxShadow: "0 8px 15px rgba(0,0,0,0.2)" }}
          transition={hoverTransition}
        >
          <input
            type="file"
            {...register("cv")}
            className="form__field"
            accept=".pdf"
          />
          <label className="form__label">Upload CV *</label>
          {errors.cv && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm mt-1"
            >
              {errors.cv.message}
            </motion.p>
          )}
        </motion.div>

        <motion.button
          type="submit"
          disabled={!isValid}
          className="px-5 py-3 bg-f83e55 rounded-lg font-semibold hover:bg-faa71a transition-colors disabled:opacity-50"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={hoverTransition}
        >
          Submit & Download PDF
        </motion.button>
      </motion.form>
    </motion.div>
  );
}