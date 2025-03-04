import { Fragment, useState } from "react";
import useFitText from "use-fit-text";
import styles from "./App.module.scss";
import Button from "./components/Buttons/Button/Button.jsx";
import Input from "./components/Input/Input.jsx";
import InputFlex from "./components/InputFlex/InputFlex.jsx";
import InputGroup from "./components/InputGroup/InputGroup.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import SectionHeader from "./components/SectionHeader/SectionHeader.jsx";

function App() {
  const [coverData, setCoverData] = useState(null);

  const handleFormSubmit = (formData) => {
    setCoverData(formData);
  };

  return (
    <Fragment>
      <Navbar />
      <CoverForm onSubmit={handleFormSubmit} />
      {coverData && <GeneratedCover {...coverData} />}
    </Fragment>
  );
}

function CoverForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    programName: "",
    programCode: "",
    authors: [{ id: 1, lastName: "", firstName: "", middleInitial: "" }]
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

function GeneratedCover({ title, year, programCode, authors }) {
  const spineWidth = Math.max(0.4, (150 + authors.length * 10) * 0.002); // Adjust spine width based on authors
  const authorsSurnames = authors.map((a) => a.lastName).filter(Boolean);

  return (
    <section
      className={styles.generatedCover}
      style={{ "--spine-width": `${spineWidth}in` }}>
      <div className={styles.container}>
        <SectionHeader title="Generated Cover" />
        <div className={styles.wrapper}>
          <div className={styles.cover}>
            <Spine
              courseCode={programCode}
              authorsSurnames={authorsSurnames}
              title={title}
              year={year}
            />
            <Front />
          </div>
        </div>
      </div>
    </section>
  );
}

function Spine({ authorsSurnames, courseCode, title, year }) {
  const { fontSize: titleSize, ref: titleRef } = useFitText();
  const { fontSize: courseCodeSize, ref: courseCodeRef } = useFitText();
  const { fontSize: yearSize, ref: yearRef } = useFitText();
  const { fontSize: surnamesSize, ref: surnamesRef } = useFitText();

  return (
    <div className={styles.spine}>
      <div className={styles.separator} />
      <p
        className={styles.courseCode}
        ref={courseCodeRef}
        style={{ fontSize: courseCodeSize }}>
        {courseCode}
      </p>
      <div className={styles.separator} />
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
      <div className={styles.separator} />
      <p
        className={styles.year}
        ref={yearRef}
        style={{ fontSize: yearSize }}>
        {year}
      </p>
      <div className={styles.separator} />
    </div>
  );
}

function Front() {
  return <div className={styles.front}></div>;
}

export default App;
