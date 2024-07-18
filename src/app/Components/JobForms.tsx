'use client';
import "@radix-ui/themes/styles.css";
import { RadioGroup, TextArea, TextField, Theme } from "@radix-ui/themes";
import {
    CitySelect,
    CountrySelect,
    StateSelect,
    LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { Button } from "@radix-ui/themes";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faEnvelope, faMobile, faPerson, faPhone, faStar, faUser} from "@fortawesome/free-solid-svg-icons";
import ImageUpload from "./ImageUpload";
import { redirect } from "next/navigation";
import { saveJobsActions } from "../actions/JobAction";

export default function JobForms({orgId}:{orgId:string;}) {
    const [countryId, setCountryId] = useState(0);
    const [stateId, setstateId] = useState(0);
    const [cityId , setCityId] = useState(0);
    const [countryName , setCountryName] = useState('');
    const [stateName , setStateName] = useState('');
    const [cityName , setCityName] = useState('');

    async function handleSaveJob(data: FormData) {
        data.set('country' , countryName.toString());
        data.set('state' , stateName.toString());
        data.set('city' , cityName.toString());
        data.set('orgId' , orgId);
        const jobDoc = await saveJobsActions(data);
        redirect(`/jobs/${jobDoc.orgId}`);
    }

    return (
        <Theme>
            <form action={handleSaveJob} className="container mt-6 flex flex-col gap-4">
                <TextField.Root name="title" placeholder="Job title" />
                
                <div className="grid grid-cols-3 gap-4 *:grow">
                    <div className="">
                        Remote?
                        <RadioGroup.Root defaultValue="Hybrid" name="remote">
                            <RadioGroup.Item value="on-site">On-site</RadioGroup.Item>
                            <RadioGroup.Item value="Hybrid">Hybrid</RadioGroup.Item>
                            <RadioGroup.Item value="full-Remote">Fully Remote</RadioGroup.Item>
                        </RadioGroup.Root>
                    </div>
                    <div className="">
                        Full Time ?
                        <RadioGroup.Root defaultValue="Full-Time" name="type">
                            <RadioGroup.Item value="Project">Project</RadioGroup.Item>
                            <RadioGroup.Item value="Part-Time">Part-Time</RadioGroup.Item>
                            <RadioGroup.Item value="Full-Time">Full-Time</RadioGroup.Item>
                        </RadioGroup.Root>
                    </div>
                    <div className="">
                        Salary (per year)
                        <TextField.Root name="salary">
                            <TextField.Slot>$</TextField.Slot>
                        </TextField.Root>
                    </div>
                </div>
                <div className="">
                    Location
                    <div className="flex flex-col md:flex-row gap-4 *:grow">
                        <CountrySelect
                            onChange={(e:any) => {
                                setCountryId(e.id);
                                setCountryName(e.name);
                            }}
                            placeHolder="Select Country"
                        />

                        <StateSelect
                            countryid={countryId}
                            onChange={(e:any) => {
                                setstateId(e.id);
                                setStateName(e.name);
                            }}
                            placeHolder="Select State"
                        />

                        <CitySelect
                            countryid={countryId}
                            stateid={stateId}
                            onChange={(e:any) => {
                                setCityId(e.id);
                                setCityName(e.name);
                            }}
                            placeHolder="Select City"
                        />
                    </div>
                </div>
                <div className="sm:flex">
                    <div className="w-1/3 ">
                        <h3>Job Icon</h3>
                        <ImageUpload name="jobIcon" icon={faStar}/>
                    </div>
                    <div className="grow">
                        <h3>Contact Person</h3>
                        <div className="flex gap-2">
                            <div className="">
                            <ImageUpload name="contactPhoto" icon={faUser}/>
                            </div>
                            <div className="grow flex flex-col gap-1">
                                <TextField.Root placeholder="Name" name="contactName" >
                                    <TextField.Slot><FontAwesomeIcon icon={faUser}/></TextField.Slot>
                                </TextField.Root>
                                <TextField.Root placeholder="Phone" type="tel" name="contactPhone">
                                    <TextField.Slot><FontAwesomeIcon icon={faPhone}/></TextField.Slot>
                                </TextField.Root>
                                <TextField.Root placeholder="Email" type="email" name="contactEmail">
                                    <TextField.Slot><FontAwesomeIcon icon={faEnvelope}/></TextField.Slot>
                                </TextField.Root>
                            </div>
                        </div>
                    </div>
                </div>
                <TextArea placeholder="Job Description " resize={"vertical"} name="description" />
                <div className="flex items-center justify-center">
                    <Button size="3"><span className="px-8">Save</span></Button>
                </div>
            </form>
        </Theme>
    )
}