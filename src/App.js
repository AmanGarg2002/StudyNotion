import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/common/Navbar";
import Error from "./pages/Error";
import ForgotPassword from "./pages/ForgotPassword";
import OpenRoute from "./components/core/Auth/OpenRoute";
import UpdatePassword from "./pages/UpdatePassword";
import ResetComplete from "./pages/ResetComplete";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import MyProfile from "./components/core/Dashboard/MyProfile";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import PurchaseHistory from "./components/core/Dashboard/PurchaseHistory";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import AddCategory from "./components/core/Dashboard/Admin/AddCategory";

function App() {
  const { user } = useSelector((state) => state.profile);
  const [progress, setProgress] = useState(0);
  return (
    <div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <LoadingBar
        color="#118AB2"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home setProgress={setProgress} />}></Route>

        <Route
          path="/catalog/:catalogName"
          element={<Catalog setProgress={setProgress} />}
        ></Route>
        <Route
          path="/courses/:courseId"
          element={<CourseDetails setProgress={setProgress} />}
        ></Route>

        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login setProgress={setProgress} />
            </OpenRoute>
          }
        ></Route>

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup setProgress={setProgress} />
            </OpenRoute>
          }
        ></Route>

        <Route
          path="/forget-password"
          element={
            <OpenRoute>
              <ForgotPassword setProgress={setProgress} />
            </OpenRoute>
          }
        ></Route>

        <Route
          path="/reset-complete"
          element={
            <OpenRoute>
              <ResetComplete setProgress={setProgress} />
            </OpenRoute>
          }
        ></Route>

        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword setProgress={setProgress} />
            </OpenRoute>
          }
        ></Route>

        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail setProgress={setProgress} />
            </OpenRoute>
          }
        ></Route>

        <Route
          element={
            <PrivateRoute>
              <Dashboard setProgress={setProgress}></Dashboard>
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />}></Route>

          <Route path="/dashboard/settings" element={<Settings />}></Route>

          {/* FOR STUDENTS DASHBOARD ONLY */}

          {user && user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="/dashboard/cart" element={<Cart />}></Route>

              <Route
                path="/dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              ></Route>

              <Route
                path="/dashboard/purchase-history"
                element={<PurchaseHistory />}
              ></Route>
            </>
          )}

          {/* FOR INSTRUCTOR DASHBOARD ONLY */}

          {user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route
                path="/dashboard/instructor"
                element={<Instructor />}
              ></Route>

              <Route
                path="/dashboard/my-courses"
                element={<MyCourses />}
              ></Route>

              <Route
                path="/dashboard/add-course"
                element={<AddCourse />}
              ></Route>

              <Route
                path="/dashboard/edit-course/:courseId"
                element={<EditCourse />}
              ></Route>
            </>
          )}

          {/* FOR ADMIN DASHBOARD ONLY */}
          {user && user?.accountType === ACCOUNT_TYPE.ADMIN && (
            <Route
              path="/dashboard/add-category"
              element={<AddCategory />}
            ></Route>
          )}
        </Route>

        {/* Route For Viewing The Course Videos */}
        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails setProgress={setProgress} />}
              ></Route>
            </>
          )}
        </Route>

        <Route
          path="/about"
          element={<About setProgress={setProgress} />}
        ></Route>
        <Route
          path="/contact"
          element={<ContactUs setProgress={setProgress} />}
        ></Route>

        <Route path="*" element={<Error setProgress={setProgress} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
