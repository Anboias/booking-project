interface Props {
    title: string;
}

export const SectionTitle = ({ title }: Props) => {
    return <h2 className="text-2xl font-bold">{title}</h2>;
};
