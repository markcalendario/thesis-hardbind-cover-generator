import { Fragment, useState } from "react";
import styles from "./App.module.scss";
import Button from "./components/Buttons/Button/Button.jsx";
import Input from "./components/Input/Input.jsx";
import InputFlex from "./components/InputFlex/InputFlex.jsx";
import InputGroup from "./components/InputGroup/InputGroup.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";

function App() {
  const handleFormSubmit = (formData) => {
    console.log("Submitted Data:", formData);
  };

  return (
    <Fragment>
      <Navbar />
      <CoverForm onSubmit={handleFormSubmit} />
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
    setFormData({
      ...formData,
      authors: [
        ...formData.authors,
        {
          id: formData.authors.length + 1,
          lastName: "",
          firstName: "",
          middleInitial: ""
        }
      ]
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAuthorChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAuthors = [...formData.authors];
    updatedAuthors[index][name] = value;
    setFormData({ ...formData, authors: updatedAuthors });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <section className={styles.coverForm}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Your Thesis Information</h1>
          <p className={styles.description}>
            This website will not collect any information you put here.
          </p>
        </div>
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

export default App;
