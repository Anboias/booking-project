import { SectionTitle } from "@/components/section-title";

export default function ServicesPage() {
    return (
        <>
            <SectionTitle title="Services" />
        </>
    );
}

export async function getStaticProps() {
    return { props: { title: 'Services' } }
}