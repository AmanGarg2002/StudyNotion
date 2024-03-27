import React, { useEffect, useState } from "react";
import Footer from "../components/common/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import CourseCardCatalog from "../components/core/Catalog/Course_Card";
import CourseSlider from "../components/core/Catalog/CourseSlider";

const Catalog = ({ setProgress }) => {
  const tabsName = [
    {
      active: 0,
      title: "Most popular",
    },
    {
      active: 1,
      title: "New",
    },
    {
      active: 2,
      title: "Trending",
    },
  ];

  const { catalogName } = useParams();

  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  let renderCards = 0;
  const [currentTab, setCurrentTab] = useState(tabsName[0].title);
  const [loading, setLoading] = useState(false);

  const [active, setActive] = useState(tabsName[0].active);

  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      const category_id = res?.data?.allcategory?.filter(
        (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
      )[0]._id;
      setCategoryId(category_id);
    };
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoryDetails = async () => {
      setProgress(20);
      setLoading(true);
      try {
        if (categoryId) {
          const res = await getCatalogPageData(categoryId);
          console.log("PRINTING THE RES:", res);
          setCatalogPageData(res);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
      setTimeout(() => {
        setProgress(100);
      }, 900);
    };
    getCategoryDetails();
  }, [categoryId, active]);

  return (
    <div className=" relative min-h-[calc(100vh-3.5rem)]">
      {loading ? (
        <div className=" absolute left-[50%] top-[50%] spinner"></div>
      ) : (
        <>
          <div>
            {/* Section 1 */}
            <section className="  bg-richblack-800  flex flex-col items-center justify-center py-8">
              <div className=" w-11/12 max-w-maxContent mx-auto flex justify-between gap-9 ">
                <div className=" flex flex-col gap-3  sm:w-[70%]">
                  <p className=" text-richblack-300 text-sm font-normal flex flex-row gap-2">
                    <span
                      className=" cursor-pointer"
                      onClick={() => navigate("/")}
                    >
                      Home
                    </span>
                    <span>/</span>
                    <span>Catalog</span>
                    <span>/</span>
                    <span className=" text-yellow-50 text-sm font-medium capitalize">
                      {catalogPageData?.selectedCategory?.name?.toLowerCase()}
                    </span>
                  </p>
                  <p className=" text-richblack-5 text-4xl font-medium capitalize">
                    {" "}
                    {catalogPageData?.selectedCategory?.name?.toLowerCase()}
                  </p>
                  <p className=" text-richblack-200 text-sm font-normal text-justify capitalize">
                    {catalogPageData?.selectedCategory?.description}
                  </p>
                </div>

                <div className=" sm:w-[282px] hidden sm:items-center md:items-start sm:flex flex-col gap-3">
                  <p className=" text-lg text-richblack-5">Related resources</p>

                  <ul className=" flex flex-col list-disc gap-2 list-inside text-richblack-100 text-sm">
                    <li className=" capitalize">{`Doc ${catalogName
                      .split("-")
                      .join(" ")}`}</li>
                    <li>Cheatsheets</li>
                    <li>Articles</li>
                    <li>Community Forums</li>
                    <li>Projects</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="  bg-richblack-900  flex flex-col items-center justify-center py-14">
              <div className=" w-11/12 max-w-maxContent flex flex-col gap-[52px]">
                {/* Part 1 */}
                <div className=" flex flex-col gap-10">
                  <div className=" flex flex-col gap-3 ">
                    <p className=" text-richblack-5 text-3xl font-semibold">
                      Courses to get you started
                    </p>

                    <div className="flex gap-6 text-base h-[30px] font-normal    border-b-[1px] border-richblack-600">
                      {tabsName.map((element, active) => (
                        <p
                          key={active}
                          onClick={() => {
                            setCurrentTab(element.title);
                            setActive(element.active);
                          }}
                          className={` ${
                            currentTab === element.title
                              ? " text-yellow-100 border-b-[1px] border-spacing-3 border-yellow-100 "
                              : "text-richblack-200"
                          } transition-all duration-200 cursor-pointer`}
                        >
                          {element.title}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <CourseSlider
                      Courses={
                        active === 0
                          ? catalogPageData?.selectedCategory?.courses //most popluar fine
                          : active === 2
                          ? catalogPageData?.oneDifferntCategory?.courses
                              .length === 0
                            ? catalogPageData?.selectedCategory?.courses
                            : catalogPageData?.oneDifferntCategory?.courses
                          : catalogPageData?.topSellingCourses
                      }
                    />
                  </div>
                </div>

                {/* Part 2 */}
                <div className=" flex flex-col gap-10">
                  <p className=" text-richblack-5 text-3xl font-semibold capitalize">
                    Top Courses in{" "}
                    {catalogPageData?.selectedCategory?.name.toLowerCase()} and{" "}
                    {catalogPageData?.oneDifferntCategory?.name.toLowerCase()}
                  </p>
                  <div>
                    <CourseSlider
                      // Courses={
                      //   active === 0
                      //     ? catalogPageData?.selectedCategory?.courses
                      //     : active === 1
                      //     ? catalogPageData?.oneDifferntCategory?.courses
                      //         .length > 0
                      //       ? catalogPageData?.oneDifferntCategory?.courses
                      //       : catalogPageData?.selectedCategory?.courses
                      //     : catalogPageData?.selectedCategory?.courses
                      // }
                      Courses={catalogPageData?.selectedCategory?.courses}
                      additonalCourses={
                        catalogPageData?.oneDifferntCategory?.courses
                      }
                    />
                  </div>
                </div>

                {/* Part 3 */}

                <div className=" flex flex-col gap-10 mt-[38px]">
                  <p className=" text-richblack-5 text-3xl font-semibold">
                    Frequently Bought
                  </p>

                  <div className=" grid grid-cols-1 md:w-[65%] md:mx-auto lg:mx-0  lg:w-[100%] lg:grid-cols-2 gap-x-20 gap-y-8">
                    {active === 0 &&
                      catalogPageData?.topSellingCourses
                        ?.slice(0, 4)
                        .map((course, index) => (
                          <CourseCardCatalog
                            course={course}
                            key={index}
                            Height="320"
                          />
                        ))}
                    {active === 1 &&
                      catalogPageData?.differntCategory.map((category) =>
                        category?.courses?.slice(0, 1)?.map((course, index) => {
                          if (renderCards < 4) {
                            renderCards++;
                            return (
                              <CourseCardCatalog
                                course={course}
                                key={index}
                                Height="320"
                              />
                            );
                          }

                          return null;
                        })
                      )}
                    {active === 2 &&
                      catalogPageData?.selectedCategory?.courses
                        ?.slice(0, 4)
                        ?.map((course, index) => (
                          <CourseCardCatalog
                            course={course}
                            key={index}
                            Height="320"
                          />
                        ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="w-full bg-richblack-800">
            <Footer></Footer>
          </div>
        </>
      )}
    </div>
  );
};

export default Catalog;
