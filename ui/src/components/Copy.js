// Copy.js
import React from "react";

const Copy = () => {
  return (
    <div className="bg-blue-100 text-gray-700 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Effortless Claims Processing */}
          <div className="flex flex-col items-center">
            <img
              src="/images/Effortless Processing.jpg"
              alt="Effortless Claims Processing"
              className="mb-4 rounded-lg w-full lg:w-1/2 xl:w-1/4"
              style={{ maxWidth: "200px", maxHeight: "100px" }}
            />

            <p className="text-lg font-bold mb-2">
              Effortless Claims Processing
            </p>
            <p className="text-sm">
              Say goodbye to paperwork and long wait times. Our platform
              streamlines the entire claims process, making it quick and
              hassle-free.
            </p>
          </div>

          {/* Secure and Confidential */}
          <div className="flex flex-col items-center">
            <img
              src="/images/secureAndConfedential.jpg"
              alt="Secure and Confidential"
              className="mb-4 rounded-lg w-full lg:w-1/2 xl:w-1/4"
              style={{ maxWidth: "200px", maxHeight: "100px" }}
            />
            <p className="text-lg font-bold mb-2">Secure and Confidential</p>
            <p className="text-sm">
              Your health information is precious. Rest easy knowing that our
              platform prioritizes the security and confidentiality of your
              data.
            </p>
          </div>

          {/* Intelligent Automation */}
          <div className="flex flex-col items-center">
            <img
              src="/images/intelligentAutomation.jpg"
              alt="Intelligent Automation"
              className="mb-4 rounded-lg w-full lg:w-1/2 xl:w-1/4"
              style={{ maxWidth: "200px", maxHeight: "100px" }}
            />
            <p className="text-lg font-bold mb-2">Intelligent Automation</p>
            <p className="text-sm">
              We leverage cutting-edge technology to automate repetitive tasks,
              allowing you to focus on what matters most—your well-being.
            </p>
          </div>

          {/* Real-Time Updates */}
          <div className="flex flex-col items-center">
            <img
              src="/images/realTimeUpdates.jpg"
              alt="Real-Time Updates"
              className="mb-4 rounded-lg w-full md:w-1/2 lg:w-1/4 xl:w-1/6"
              style={{ maxWidth: "200px", height: "100px" }}
            />

            <p className="text-lg font-bold mb-2">Real-Time Updates</p>
            <p className="text-sm">
              Track the status of your claims in real-time. No more guessing
              games. Stay informed every step of the way.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Copy;
