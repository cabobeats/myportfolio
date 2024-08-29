'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";

const DownloadButton = () => {
  const handleDownloadCV = () => {
    window.open('https://piquant-malkoha.pikapod.net/api/files/09zfmr98pd8f7c8/xieegfzdua4hovd/ivan_rodriguez_cv_3_1_F8C0c2k8bH.pdf?token=', '_blank');
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className="uppercase flex items-center gap-2"
      onClick={handleDownloadCV}
    >
      <span>Download CV</span>
      <FiDownload className="text-xl" />
    </Button>
  );
};

export default DownloadButton;