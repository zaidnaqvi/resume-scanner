// import fs from "fs";
// import pdfParse from "pdf-parse";
// import path from "path";

// const SKILL_SET = [
//   "JavaScript",
//   "Node.js",
//   "React",
//   "MongoDB",
//   "Python",
//   "Machine Learning",
//   "SQL",
//   "Docker",
//   "AWS",
// ];

// const parseResume = async (filePath, jobSkills) => {
//   const dataBuffer = fs.readFileSync(filePath);
//   const data = await pdfParse(dataBuffer);

//   const resumeText = data.text.toLowerCase();
//   const lines = resumeText
//     .split("\n")
//     .map((line) => line.trim())
//     .filter((line) => line);
//   const candidateName = lines.length > 0 ? lines[0] : "Unknown";

//   const extractedSkills = SKILL_SET.filter((skill) =>
//     resumeText.includes(skill.toLowerCase())
//   );
//   const jobSkillMatch = jobSkills.map((skill) => skill.toLowerCase());
//   const matchedSkills = extractedSkills.filter((skill) =>
//     jobSkillMatch.includes(skill.toLowerCase())
//   );
//   const matchPercentage = Math.round(
//     (matchedSkills.length / jobSkillMatch.length) * 100
//   );

//   return { candidateName, extractedSkills, AI_Score: matchPercentage };
// };

// export default parseResume;

import fs from "fs";
import pdfParse from "pdf-parse";
import path from "path";

const SKILL_SET = [
  "JavaScript",
  "Node.js",
  "React",
  "MongoDB",
  "Python",
  "Machine Learning",
  "SQL",
  "Docker",
  "AWS",
];

const parseResume = async (filePath, jobSkills) => {
  try {
    // Ensure the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    // Convert to absolute path
    const absolutePath = path.resolve(filePath);
    console.log("Parsing Resume:", absolutePath);

    // Read the PDF file
    const dataBuffer = fs.readFileSync(absolutePath);
    const data = await pdfParse(dataBuffer);
    console.log("data = ", data);
    if (!data.text) throw new Error("Failed to extract text from PDF.");

    const resumeText = data.text.toLowerCase();
    const lines = resumeText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);

    const candidateName = lines.length > 0 ? lines[0] : "Unknown";

    const extractedSkills = SKILL_SET.filter((skill) =>
      resumeText.includes(skill.toLowerCase())
    );

    const jobSkillMatch = jobSkills.map((skill) => skill.toLowerCase());
    const matchedSkills = extractedSkills.filter((skill) =>
      jobSkillMatch.includes(skill.toLowerCase())
    );

    const matchPercentage = Math.round(
      (matchedSkills.length / jobSkillMatch.length) * 100
    );
    console.log(
      "{ candidateName, extractedSkills, AI_Score: matchPercentage }",
      { candidateName, extractedSkills, AI_Score: matchPercentage }
    );
    return { candidateName, extractedSkills, AI_Score: matchPercentage };
  } catch (error) {
    console.error("Error parsing resume:", error.message);
    return { error: "Failed to parse resume." };
  }
};

export default parseResume;
