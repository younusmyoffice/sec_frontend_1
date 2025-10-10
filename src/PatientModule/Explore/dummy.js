{
    RequestcardData.map((el, index) => (
        <CustomRequestCard
            label={"Accept"}
            key={`${el.suid}${index}`}
            profile_picture={el.profile_picture}
            name={`${el.name}`}
            appointment_date={`${el.appointment_date}`}
        />
    ));
}

<CallCardData
    linkPath={`/PatientModule/hcfDetailCard/`}
    sendCardData={cardData}
    CardData={data}
    textField={"HCF Card Component"}
/>;
