import { Section } from "@/components/section";
import { PassengersList } from "./passengers-list";

export default function PassengersPage() {
    return (
        <>
            <Section.Title title="Passengers" />
            <PassengersList />
        </>
    );
}

