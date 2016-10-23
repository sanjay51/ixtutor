// this is just a sample data structure model

let user: any = {
    id: "234", //index
    email: "email", //index
    data: {
        password: "password",
        name: "Sanjay Verma",
        status: "active", //ACTIVE, TERMINATED, AWAITING_CONFIRMATION
        creation_timestamp: "D22Oct2016T09:47PMIST",
        courses_authored: ["courseId1"],
        courses_enrolled: [
            {
                courseId: "cid23",
                progress: {
                    state: "COMPLETED", //COMPLETED, YET_TO_BEGIN, IN_PROGRESS
                    chapterId: "1",
                    sectionId: "1"
                },
                enrollment_timestamp: "D22Oct2016T09:53PMIST",
                completion_timestamp: "D22Nov2016T09:53PMIST"
            }
        ]
    }
}