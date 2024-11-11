import { memo, useCallback, useState } from "react";
import tfcImage from "./assets/bandeau-tcf-canada.jpg";
import Chronometer from "./components/Chronometer";
import Countries from "./components/countries";
import FormControl from "./components/FormControl";
import Langues from "./components/langues";
import Motif from "./components/motif";
import { Formik } from "formik";
import { MdTimer } from "react-icons/md";

interface FormValues {
  email: string;
  password: string;
  name: string;
  firstname: string;
  birthdate: string;
  phone: string;
  document: string;

  picture: null | string;
  frontDocument: null | string;
  backDocument: null | string;
}

const App = memo(() => {
  const initialValues: FormValues = {
    email: "",
    password: "",
    name: "",
    firstname: "",
    birthdate: "",
    phone: "",
    document: "",
    picture: null,
    frontDocument: null,
    backDocument: null,
  };
  const [play, setPlayinng] = useState(true);
  const [restart, _setRestart] = useState(false);
  const setRestart = useCallback(
    (value: boolean) => {
      _setRestart(value);
    },
    [_setRestart]
  );
  const setPlay = useCallback(
    (value: boolean) => {
      setPlayinng(value);
    },
    [setPlayinng]
  );
  const validateFile = (file: string) => {
    const allowedTypes = ["image/png", "image/jpeg"];
    if (!file) return "File is required";
    if (!allowedTypes.includes(file)) return "Invalid file type";
    return undefined;
  };
  return (
    <div className="relative">
      <div className="bg-purple-700 h-10 mb-7 flex p-2">
        <div className="flex font-biber text-white justify-between items-center">
          <span className="text-2xl">
            <MdTimer />
          </span>
          <span className="text-2xl">Lucky Luc</span>
        </div>
        <div className="flex gap-4  leading-none text-white/90 mx-auto w-fit font-biber text-2xl">
          <span>Entraines-toi à remplir le plus rapidement le formulaire</span>
          <span className="bg-green-100 px-2 rounded text-green-500">
            {" "}
            idéal : 30-50s
          </span>
        </div>
      </div>

      <div className="fixed top-0 right-0 z-50 mr-3 border h-min">
        <Chronometer
          play={play}
          setPlay={setPlay}
          restart={restart}
          setRestart={setRestart}
        />
      </div>
      <div className="grid font-poppins text-sm relative max-w-full gap-4 lg:grid-flow-col  lg:max-w-7xl 4xl:max-w-[85rem] lg:mx-auto lg:mb-8 lg:gap-0">
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors: Partial<FormValues> = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "email invalid";
            }
            if (!values.name || values.name.length < 2) {
              errors.name = "longueur du nom invalide";
            }
            if (!values.firstname || values.firstname.length < 2) {
              errors.firstname = "longueur du prénom invalide";
            }
            if (!values.phone || values.phone.length < 2) {
              errors.phone = "numéro invalide";
            }
            if (!values.document || values.document.length < 2) {
              errors.document = "numéro de document invalide";
            }

            if (!values.birthdate) {
              errors.birthdate = "Date of birth is required";
            }
            if (!values.picture) {
              errors.picture = "photo obligatoire";
            }
            if (!values.frontDocument) {
              errors.frontDocument = "photo obligatoire";
            }
            if (!values.backDocument) {
              errors.backDocument = "photo obligatoire";
            }

            return errors;
          }}
          validateOnBlur={true}
          validateOnChange={true}
          onSubmit={() => {
            setPlay(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            setFieldValue,
            setFieldError,
            handleBlur,
            handleSubmit,
            // isSubmitting,
          }) => (
            <>
              <form
                action="#"
                className="p-4 w-full max-w-full "
                onSubmit={handleSubmit}
              >
                <div className="w-fit grid gap-6  mx-auto  lg:max-w-5xl">
                  <FormControl>
                    <label htmlFor="email" className="">
                      email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="m-0"
                      placeholder="johndoe@gmail.com"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {errors.email && touched.email && (
                      <div className="text-xs text-red-500">{errors.email}</div>
                    )}
                  </FormControl>
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="grid gap-6">
                      <FormControl>
                        <label className="">nom(s)</label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="doe"
                          onChange={handleChange}
                          onInput={handleChange}
                          onBlur={handleChange}
                          value={values.name}
                        />
                        {errors.name && touched.name && (
                          <div className="text-xs text-red-500">
                            {errors.name}
                          </div>
                        )}
                      </FormControl>
                      <FormControl>
                        <label htmlFor="">prenom</label>
                        <input
                          type="text"
                          name="firstname"
                          id="firstname"
                          placeholder="john"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.firstname}
                        />
                        {errors.firstname && touched.firstname && (
                          <div className="text-xs text-red-500">
                            {errors.firstname}
                          </div>
                        )}
                      </FormControl>
                    </div>
                    <div className="relative lg:order-first grid place-items-center aspect-video max-h-40 w-full px-2 md:px-4 border-dashed border-2 border-blue-300">
                      <input
                        type="file"
                        name="picture"
                        onChange={(event) => {
                          const file = event.currentTarget.files?.[0] || null;
                          setFieldError(
                            "picture",
                            validateFile(file?.type ?? "")
                          );
                          setFieldValue("picture", file);
                        }}
                      />
                      <div className=" top-full">
                        {errors.picture && (
                          <div className="text-xs text-red-500 w-full bg-black">
                            {errors.picture}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-6">
                    <FormControl>
                      <label htmlFor="">mot de passe</label>
                      <input
                        type="password"
                        name="password"
                        placeholder="****"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      {errors.password && touched.password && (
                        <div className="text-xs text-red-500">
                          {errors.password}
                        </div>
                      )}
                    </FormControl>
                    <FormControl>
                      <label htmlFor="">date naissance</label>
                      <input
                        type="date"
                        name="birthdate"
                        placeholder="jj/mm/yyyy"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.birthdate}
                      />
                      {errors.birthdate && touched.birthdate && (
                        <div className="text-xs absolute top-full text-red-500">
                          {errors.birthdate}
                        </div>
                      )}
                    </FormControl>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-6">
                    <FormControl>
                      <label>pays naissance</label>
                      <Countries />
                    </FormControl>
                    <FormControl>
                      <label>sexe</label>
                      <select
                        name="utilisateur[sexe]"
                        defaultValue={"masculin"}
                      >
                        <option value="masculin">homme</option>
                        <option value="feminin">femme</option>
                        <option value="non binaire">non binaire</option>
                      </select>
                    </FormControl>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-6">
                    <FormControl>
                      <label>nationalite</label>
                      <Countries />
                    </FormControl>
                    <FormControl>
                      <label htmlFor="">telephone</label>
                      <input
                        type="text"
                        name="phone"
                        placeholder="699999999"
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(
                            /\D/g,
                            ""
                          ); // Remove any non-numeric characters
                          setFieldValue("phone", numericValue);
                        }}
                        onBlur={handleBlur}
                        id="phone"
                        value={values.phone}
                      />
                      {errors.phone && touched.phone && (
                        <div className="text-xs text-red-500">
                          {errors.phone}
                        </div>
                      )}
                    </FormControl>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-6">
                    <FormControl>
                      <label>langue</label>
                      <Langues />
                    </FormControl>
                    <FormControl>
                      <label htmlFor="">code candidat</label>
                      <input type="text" name="utilisateur[codeCandidat]" />
                    </FormControl>
                  </div>
                  <FormControl>
                    <label htmlFor="">motif d'inscription</label>
                    <Motif />
                  </FormControl>
                  <div className="grid lg:grid-cols-2 gap-6">
                    <FormControl>
                      <label>type document</label>
                      <select name="utilisateur[document]">
                        <option value="cni">carte national</option>
                        <option value="passeport">passeport</option>
                      </select>
                    </FormControl>
                    <FormControl>
                      <label htmlFor="">numero cni ou passeport</label>
                      <input
                        type="text"
                        name="document"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        id="document"
                        value={values.document}
                      />
                    </FormControl>
                  </div>
                  <div className="grid lg:grid-cols-2 gap-6">
                    <FormControl>
                      <label htmlFor="" className="grid gap-2">
                        face avant
                      </label>
                      <input
                        type="file"
                        name="frontDocument"
                        id="frontDocument"
                        onChange={(event) => {
                          const file = event.currentTarget.files?.[0] || null;
                          setFieldError(
                            "frontDocument",
                            validateFile(file?.type ?? "")
                          );
                          setFieldValue("frontDocument", file);
                        }}
                      />
                      <div className="top-full">
                        {errors.frontDocument && (
                          <div className="text-xs text-red-500 w-full bg-black">
                            {errors.frontDocument}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormControl>
                      <label htmlFor="" className="grid gap-2">
                        face arriere
                      </label>
                      <input
                        type="file"
                        name="backDocument"
                        id="backDocument"
                        onChange={(event) => {
                          const file = event.currentTarget.files?.[0] || null;
                          setFieldError(
                            "backDocument",
                            validateFile(file?.type ?? "")
                          );
                          setFieldValue("backDocument", file);
                        }}
                      />
                      <div className="  top-full">
                        {errors.backDocument && (
                          <div className="text-xs text-red-500 w-full bg-black">
                            {errors.backDocument}
                          </div>
                        )}
                      </div>
                    </FormControl>
                  </div>
                  <div className="capitalize">
                    <ul>
                      <div>telechargez</div>
                      <li className="ml-4">
                        ▪ photocopie recto/verso de la piece d'identite
                      </li>
                      <li className="ml-4">
                        ▪ 01 photo 4*4 couleur sur fond blanc
                      </li>
                    </ul>
                  </div>
                  <div>
                    <label
                      htmlFor="authorisationCandidat"
                      className="flex gap-2 items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        defaultChecked
                        name=""
                        id="authorisationCandidat"
                      />
                      <span>
                        j'autorise l'ifc à utiliser mes données pour besoin
                        d'information
                      </span>
                    </label>
                  </div>
                </div>
              </form>
              <div className="w-full max-w-sm mb-5 mx-auto p-2 grid gap-2  top-[80px] sticky text-center  lg:h-fit lg:border">
                <img
                  src={tfcImage}
                  alt=""
                  className="max-w-full object-cover"
                />
                <p className="first-letter:uppercase">
                  test de connaissance de langue pour le canada (TCF- CANADA)
                </p>
                <p className="flex justify-around border rounded-sm p-2">
                  01 inscription 210 000 FCAFA <span>✔</span>
                </p>
                <p className="uppercase text-xl text-gray-400">
                  total ttc 210 000 fcfa
                </p>
                <button
                  onClick={() => {
                    setPlayinng(false);
                  }}
                  disabled={
                    Object.keys(errors).length > 0 ||
                    !Object.keys(touched).length
                  }
                  type="button"
                  className="bg-purple-500 capitalize text-white p-2 rounded-sm shadow disabled:bg-opacity-35 disabled:cursor-not-allowed"
                >
                  s'inscrire maintenant
                </button>
              </div>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
});

export default App;
