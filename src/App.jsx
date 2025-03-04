import { Fragment, useRef, useState } from "react";
import useFitText from "use-fit-text";
import styles from "./App.module.scss";
import Button from "./components/Buttons/Button/Button.jsx";
import Input from "./components/Input/Input.jsx";
import InputFlex from "./components/InputFlex/InputFlex.jsx";
import InputGroup from "./components/InputGroup/InputGroup.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import SectionHeader from "./components/SectionHeader/SectionHeader.jsx";
import download from "./utils/download.js";

function App() {
  const [coverData, setCoverData] = useState(null);

  const handleFormSubmit = (formData) => {
    setCoverData(formData);
  };

  return (
    <Fragment>
      <Navbar />
      {coverData && <GeneratedCover {...coverData} />}
      <CoverForm onSubmit={handleFormSubmit} />
    </Fragment>
  );
}

function CoverForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    pages: "",
    programName: "",
    programCode: "",
    authors: []
  });

  const addAuthor = () => {
    setFormData((prev) => ({
      ...prev,
      authors: [
        ...prev.authors,
        {
          id: prev.authors.length + 1,
          lastName: "",
          firstName: "",
          middleInitial: ""
        }
      ]
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuthorChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedAuthors = [...prev.authors];
      updatedAuthors[index][name] = value;
      return { ...prev, authors: updatedAuthors };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <section className={styles.coverForm}>
      <div className={styles.container}>
        <SectionHeader
          title="Your Thesis Information"
          description="This website will not collect any information."
        />
        <div className={styles.wrapper}>
          <form onSubmit={handleSubmit}>
            <InputGroup title="Basic Details">
              <Input
                label="Title"
                name="title"
                placeholder="Your thesis title"
                value={formData.title}
                onChange={handleChange}
              />
              <Input
                label="Year"
                name="year"
                placeholder="Year of final defense"
                value={formData.year}
                onChange={handleChange}
              />
              <Input
                label="Pages"
                name="pages"
                placeholder="Total pages"
                value={formData.pages}
                onChange={handleChange}
              />
              <Input
                label="Program Name"
                name="programName"
                placeholder="Full name of the program"
                value={formData.programName}
                onChange={handleChange}
              />
              <Input
                label="Program Code"
                name="programCode"
                placeholder="Initials of the program"
                value={formData.programCode}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup title="Authors">
              {formData.authors.map((author, index) => (
                <InputFlex key={author.id}>
                  <Input
                    label={`Author ${index + 1} Last Name`}
                    name="lastName"
                    placeholder="Last name"
                    value={author.lastName}
                    onChange={(e) => handleAuthorChange(index, e)}
                  />
                  <Input
                    label={`Author ${index + 1} First Name`}
                    name="firstName"
                    placeholder="First name"
                    value={author.firstName}
                    onChange={(e) => handleAuthorChange(index, e)}
                  />
                  <Input
                    label={`Author ${index + 1} Middle Initial`}
                    name="middleInitial"
                    placeholder="Middle initial"
                    value={author.middleInitial}
                    onChange={(e) => handleAuthorChange(index, e)}
                  />
                </InputFlex>
              ))}
              <Button
                type="button"
                onClick={addAuthor}
                className={styles.addAuthorBtn}>
                + Add Author
              </Button>
            </InputGroup>

            <Button
              type="submit"
              className={styles.submitBtn}>
              Generate Cover
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

function GeneratedCover({
  title,
  year,
  pages,
  programCode,
  programName,
  school,
  college,
  authors
}) {
  const spineWidth = Math.max(0.4, pages * 0.002);
  const authorsSurnames = authors.map((a) => a.lastName).filter(Boolean);
  const bindRef = useRef(null);
  const spineRef = useRef(null);
  const frontRef = useRef(null);

  const SpineOnly = () => (
    <Spine
      courseCode={programCode}
      authorsSurnames={authorsSurnames}
      title={title}
      year={year}
    />
  );

  const FrontOnly = () => (
    <Front
      title={title}
      school={school}
      college={college}
      authors={authors}
      programName={programName}
      year={year}
    />
  );

  return (
    <section
      className={styles.generatedCover}
      style={{ "--spine-width": `${spineWidth}in` }}>
      <div className={styles.container}>
        <SectionHeader
          title="Generated Components"
          description="Click to download"
        />
        <div className={styles.wrapper}>
          <div
            ref={bindRef}
            onClick={() => download(bindRef.current)}>
            <Bind>
              <SpineOnly />
              <FrontOnly />
            </Bind>
          </div>
          <div
            ref={spineRef}
            onClick={() => download(spineRef.current)}>
            <SpineOnly />
          </div>
          <div
            ref={frontRef}
            onClick={() => download(frontRef.current)}>
            <FrontOnly />
          </div>
          <div className="cover"></div>
        </div>
      </div>
    </section>
  );
}

function Bind({ children }) {
  const ref = useRef();

  return (
    <div
      ref={ref}
      className={styles.bind}>
      {children}
    </div>
  );
}

function Spine({ authorsSurnames, courseCode, title, year }) {
  const { fontSize: titleSize, ref: titleRef } = useFitText();
  const { fontSize: courseCodeSize, ref: courseCodeRef } = useFitText();
  const { fontSize: yearSize, ref: yearRef } = useFitText();
  const { fontSize: surnamesSize, ref: surnamesRef } = useFitText();

  return (
    <div className={styles.spine}>
      <p
        className={styles.courseCode}
        ref={courseCodeRef}
        style={{ fontSize: `calc(${courseCodeSize} - 50%)` }}>
        {courseCode}
      </p>
      <p
        className={styles.title}
        ref={titleRef}
        style={{ fontSize: titleSize }}>
        {title}
      </p>
      <div className={styles.separator} />
      <p
        className={styles.surnames}
        ref={surnamesRef}
        style={{ fontSize: surnamesSize }}>
        {authorsSurnames.join(", ")}
      </p>
      <p
        className={styles.year}
        ref={yearRef}
        style={{ fontSize: `calc(${yearSize} - 50%)` }}>
        {year}
      </p>
    </div>
  );
}

function Front({ title, authors, programName, year }) {
  return (
    <div className={styles.front}>
      <div className={styles.title}>
        <p>{title}</p>
      </div>
      <div className={styles.school}>
        <p>Polytechnic University of the Philippines</p>
        <p>College of Computer and Information Sciences</p>
      </div>

      <div className={styles.authors}>
        {authors.map((author, index) => (
          <p
            key={index}
            className={styles.author}>
            {author.lastName + ", "}
            {author.firstName + " "}
            {author.middleInitial && author.middleInitial + "."}
          </p>
        ))}
      </div>
      <div className={styles.program}>
        <p>{programName}</p>
      </div>
      <div className={styles.year}>
        <p>{year}</p>
      </div>
    </div>
  );
}

export default App;
