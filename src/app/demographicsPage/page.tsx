"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Navbar } from "../components/Navbar";
import { useRouter } from "next/navigation";
import SidebarOptionCard from "./SidebarOptionCard";
import DemographicsList from "./DemographicsList";
import DemographicsDisplay from "./DemographicsDisplay";

interface DemographicsData {
  race: Record<string, number>;
  age: Record<string, number>;
  gender: Record<string, number>;
}

interface ListItem {
  label: string;
  confidence: string;
  isSelected?: boolean;
}

const DemographicsPage = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string>("race");
  const [selectedRace, setSelectedRace] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [selectedSex, setSelectedSex] = useState<string | null>(null);
  const [demographicsData, setDemographicsData] =
    useState<DemographicsData | null>(null);

  const ageRanges = useMemo(() => [
    "0-9",
    "10-19",
    "20-29",
    "30-39",
    "40-49",
    "50-59",
    "60-69",
    "70+",
  ], []);

  useEffect(() => {
    const storedData = localStorage.getItem("demographicsData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setDemographicsData(parsedData);
      
      const firstRace = Object.entries(parsedData.race || {}).sort(
        ([, a], [, b]) => (b as number) - (a as number)
      )[0]?.[0];
      setSelectedRace(firstRace || null);
      
      const ageValues = ageRanges.map((range) => {
        const key = range === "0-9" ? "3-9" : range;
        return { range, value: parsedData.age[key] || 0 };
      });
      const total = ageValues.reduce((sum, { value }) => sum + value, 0);
      const normalizedAges = ageValues.map(({ range, value }) => ({
        range,
        normalizedValue: total > 0 ? value / total : 0
      }));
      const highestAge = normalizedAges.sort(
        (a, b) => (b.normalizedValue as number) - (a.normalizedValue as number)
      )[0]?.range;
      setSelectedAge(highestAge || null);
      
      const firstSex = Object.entries(parsedData.gender || {}).sort(
        ([, a], [, b]) => (b as number) - (a as number)
      )[0]?.[0];
      setSelectedSex(firstSex || null);
    } else {
      router.push("/picturePage");
    }
  }, [router, ageRanges]);

  const generateListItems = (): ListItem[] => {
    if (!demographicsData) return [];

    if (selectedOption === "race") {
      return Object.entries(demographicsData.race)
        .sort(([, a], [, b]) => b - a)
        .map(([race, confidence]) => ({
          label: race.toUpperCase(),
          confidence: `${Math.round(confidence * 100)}%`,
          isSelected: selectedRace === race,
        }));
    } else if (selectedOption === "age") {

      const ageValues = ageRanges.map((range) => {
        const key = range === "0-9" ? "3-9" : range;
        return demographicsData.age[key] || 0;
      });
      const total = ageValues.reduce((sum, value) => sum + value, 0);

      return ageRanges.map((range, index) => {
        const normalizedValue = total > 0 ? ageValues[index] / total : 0;
        return {
          label: range,
          confidence: `${Math.round(normalizedValue * 100)}%`,
          isSelected: selectedAge === range,
        };
      });
    } else if (selectedOption === "sex") {

      const genderValues = Object.values(demographicsData.gender);
      const total = genderValues.reduce((sum, value) => sum + value, 0);

      return Object.entries(demographicsData.gender)
        .sort(([, a], [, b]) => b - a)
        .map(([gender, value]) => {
          const normalizedValue = total > 0 ? value / total : 0;
          return {
            label: gender.toUpperCase(),
            confidence: `${Math.round(normalizedValue * 100)}%`,
            isSelected: selectedSex === gender,
          };
        });
    }

    return [];
  };

  const listItems = generateListItems();

  const getSelectedOptionText = () => {
    if (selectedOption === "race" && selectedRace) {
      return selectedRace
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    } else if (selectedOption === "age" && selectedAge) {
      return selectedAge.toUpperCase();
    } else if (selectedOption === "sex" && selectedSex) {
      return selectedSex
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }
    return "Selected Option";
  };

  const formatLabel = (label: string) => {
    return label
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const getSelectedConfidence = () => {
    if (!demographicsData) return 0;

    if (selectedOption === "race" && selectedRace) {
      const confidence = demographicsData.race[selectedRace];
      return Math.round(confidence * 100);
    } else if (selectedOption === "age" && selectedAge) {

      const ageKey = selectedAge === "0-9" ? "3-9" : selectedAge;
      const ageValues = Object.values(demographicsData.age);
      const total = ageValues.reduce((sum, value) => sum + value, 0);
      const confidence = demographicsData.age[ageKey] / total;
      return Math.round(confidence * 100);
    } else if (selectedOption === "sex" && selectedSex) {
      const genderValues = Object.values(demographicsData.gender);
      const total = genderValues.reduce((sum, value) => sum + value, 0);
      const confidence = demographicsData.gender[selectedSex] / total;
      return Math.round(confidence * 100);
    }

    return 0;
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <Navbar variant="analysis" />
      <header className="w-[500px] pl-6 xl:pt-0 lg:pt-0 md:pt-0 sm:pt-4 pt-5">
        <div className="h-[24px] text-[14px] font-[600] leading-[24px]">
          A.I. ANALYSIS
        </div>
        <div className="h-[64px] xl:text-[48px] lg:text-[48px] md:text-[48px] sm:text-[44px] text-[32px] xl:mb-5 lg:mb-5 md:mb-5 sm:mb-4 mb-0">DEMOGRAPHICS</div>
        <div className="xl:h-[48px] lg:h-[48px] md:h-[48px] sm:h-[48px] h-[32px] text-[14px] font-[400] leading-[4px]">
          PREDICTED RACE, AGE, & SEX
        </div>
      </header>
      <div className="xl:h-[calc(100vh-200px)] lg:h-[calc(100vh-200px)] md:h-[calc(100vh-200px)] sm:h-[500px] h-[430px] flex justify-between xl:flex-row lg:flex-row md:flex-row sm:flex-col flex-col xl:pt-12 lg:pt-12 md:pt-12 sm:pt-4 px-6 gap-3 xl:gap-8 lg:gap-6 md:gap-4 sm:gap-3">
        <div className="min-w-[160px] xl:w-[12%] lg:w-[14%] md:w-[19%] sm:w-[100%] w-[100%] xl:h-[452px] lg:h-[452px] md:h-[452px] sm:h-[100px] h-[70px] flex xl:flex-col lg:flex-col md:flex-col sm:flex-row gap-2">
          <SidebarOptionCard
            label="RACE"
            selectedLabel={selectedRace}
            isSelected={selectedOption === "race"}
            onClick={() => {
              setSelectedOption("race");
              const firstRace = Object.entries(
                demographicsData?.race || {}
              ).sort(([, a], [, b]) => (b as number) - (a as number))[0]?.[0];
              setSelectedRace(firstRace || null);
            }}
            imageSrc="/demographics-options.png"
            imageAlt="demographics option"
          />
          <SidebarOptionCard
            label="AGE"
            selectedLabel={selectedAge ? selectedAge.toUpperCase() : ""}
            isSelected={selectedOption === "age"}
            onClick={() => {
              setSelectedOption("age");

              const ageValues = ageRanges.map((range) => {
                const key = range === "0-9" ? "3-9" : range;
                return { range, value: demographicsData?.age[key] || 0 };
              });
              const total = ageValues.reduce((sum, { value }) => sum + value, 0);
              const normalizedAges = ageValues.map(({ range, value }) => ({
                range,
                normalizedValue: total > 0 ? value / total : 0
              }));
              const highestAge = normalizedAges.sort(
                (a, b) => (b.normalizedValue as number) - (a.normalizedValue as number)
              )[0]?.range;
              setSelectedAge(highestAge || ageRanges[0]);
            }}
            imageSrc="/demographics-options.png"
            imageAlt="demographics option"
          />
          <SidebarOptionCard
            label="SEX"
            selectedLabel={selectedSex}
            isSelected={selectedOption === "sex"}
            onClick={() => {
              setSelectedOption("sex");
              const firstSex = Object.entries(
                demographicsData?.gender || {}
              ).sort(([, a], [, b]) => (b as number) - (a as number))[0]?.[0];
              setSelectedSex(firstSex || null);
            }}
            imageSrc="/demographics-options.png"
            imageAlt="demographics option"
          />
        </div>
        <div className="xl:w-[63%] lg:w-[59%] md:w-[51%] sm:w-[100%] w-[100%]">
          <DemographicsDisplay
            selectedOptionText={getSelectedOptionText()}
            confidence={getSelectedConfidence()}
            isVisible={!!(selectedRace || selectedAge || selectedSex)}
          />
        </div>
        <div className="min-w-[200px] xl:w-[25%] lg:w-[27%] md:w-[30%] sm:w-[100%] w-[100%] xl:h-[450px] lg:h-[450px] md:h-[450px] sm:h-[200px] h-[160px]">
          <DemographicsList
            items={listItems}
            selectedOption={selectedOption}
            onSelect={(label) => {
              if (selectedOption === "race") {
                setSelectedRace(label.toLowerCase());
              } else if (selectedOption === "age") {
                setSelectedAge(label);
              } else if (selectedOption === "sex") {
                setSelectedSex(label.toLowerCase());
              }
            }}
            formatLabel={formatLabel}
          />
        </div>
      </div>
      <div className="w-full absolute bottom-[4%] flex items-center justify-between px-7">
        <Image
          src="/button-icon-text-back-b.png"
          alt="back button"
          width={100}
          height={100}
          className="hover:cursor-pointer"
          onClick={() => router.push("/analysisPage")}
        />
        <p className="xl:text-[14px] lg:text-[14px] md:text-[14px] sm:text-[14px] text-[12px] opacity-40 text-center px-2">
          If A.I. estimate is wrong, select the correct one.
        </p>
        <div className="flex gap-3 pr-2">
          <Image
            src="/button-reset.png"
            alt="reset button"
            width={60}
            height={60}
            className="cursor-not-allowed"
          />
          <Image
            src="/button-confirm.png"
            alt="confirm button"
            width={70}
            height={70}
            className="cursor-pointer"
            onClick={() => router.push("/analysisPage")}
          />
        </div>
      </div>
    </div>
  );
};

export default DemographicsPage;
