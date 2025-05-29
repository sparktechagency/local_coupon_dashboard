import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { Link } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import {
  useCreateTermsAndConditionMutation,
  useGetTernsConditionQuery,
} from "../../redux/api/settingApi";
import { toast } from "sonner";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
const TremsCondition = () => {
    const {t} = useTranslation()
  
  const { data: getTermsCondition } = useGetTernsConditionQuery();
  const [createTerms] = useCreateTermsAndConditionMutation();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const handleTerms = () => {
    const data = {
      content: content,
    };
    createTerms(data)
      .unwrap()
      .then((payload) => toast.success(payload?.message))
      .catch((error) => toast.error(error?.data?.message));
  };
  const config = {
    readonly: false,
    placeholder: "Start typings...",
    style: {
      height: 600,
    },
    buttons: [
      "image",
      "fontsize",
      "bold",
      "italic",
      "underline",
      "|",
      "font",
      "brush",
      "align",
    ],
  };

  useEffect(() => {
    setContent(getTermsCondition?.data?.[0]?.content);
  }, [getTermsCondition]);

  return (
    <>
      <div className="flex justify-start items-center gap-2 mb-3 relative m-5">
        <div className="absolute top-6 left-2 flex items-center">
          <Link
            to={-1}
            className="py-1 px-2 rounded-md flex justify-start items-center gap-1  "
          >
            <IoArrowBackSharp className="text-[var(--primary-color)]" />
          </Link>{" "}
          <p className="font-semibold mb-0">{t("termsAndConditions")}</p>
        </div>
      </div>

      <div className="custom-jodit-editor mx-5 ">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
          onChange={(newContent) => {}}
        />
        <div className="flex items-center   justify-center mt-5">
          <button
            onClick={handleTerms}
            className="bg-[var(--secondary-color)]  text-white px-4 py-2 rounded-full test"
          >
           {t("save")}
          </button>
        </div>
      </div>
    </>
  );
};

export default TremsCondition;
