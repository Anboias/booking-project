import { Section } from "@/components/section";
import { ServicesList } from "./services-list";

export default function ServicesPage() {
    return (
        <>
            <Section.Title title="Services" />
            <ServicesList />
        </>
    );
}

