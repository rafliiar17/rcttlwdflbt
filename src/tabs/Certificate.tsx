import React from "react";
import { motion } from "framer-motion";
import CertRaw from "../data/Certificate.json";

export function Certificate() {
  const certificates = Object.values(CertRaw.certificates)
    .flat()
    .filter((cert) => cert.title !== "");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {certificates.map((certificate, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="block p-6 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <h5 className="mb-3 text-2xl font-semibold text-gray-900 tracking-wide">
            {certificate.title}
          </h5>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-medium">Publisher:</span> {certificate.author}
            </p>
            <p>
              <span className="font-medium">Organization:</span> {certificate.organization}
            </p>
            <p>
              <span className="font-medium">Date Published:</span> {certificate.date}
            </p>
          </div>
          <div className="mt-4">
            <motion.a
              href={certificate.link}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              View Certificate
              <svg
                className="w-4 h-4 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default Certificate;