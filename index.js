// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript",
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50,
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150,
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500,
      },
    ],
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47,
      },
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150,
      },
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400,
      },
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39,
      },
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140,
      },
    },
  ];
  
  function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.
  
    // 1.figure who are students we are dealing

    const studentIds = []
    for (let i = 0; i<submissions.length; i++){
        studentIds.push(submissions[i].learner_id)
    }
    console.table(studentIds)
    // generate an array of student ids [125,125,125,132,132]
    // 2.remove the duplicate ids from the array
    const uniqueIds = [...new Set(studentIds)];
    console.table(uniqueIds)
    // [125,132]

    const assignmentNames = [];
    for (let i = 0; i < ag.assignments.length; i++) {
      assignmentNames.push(ag.assignments[i].name);
    }

      console.table(assignmentNames)

      const assignmentLookup = {};
      for (let a of ag.assignments) {
        assignmentLookup[a.id] = {
          due_at: new Date(a.due_at),
          points_possible: a.points_possible,
        };
      }
      console.table(assignmentLookup)


      const learners = {};


      if (ag.course_id !== course.id) {
        throw new Error("AssignmentGroup's course_id does not match the CourseInfo.id.")
      }
    
      for (let i = 0; i < submissions.length; i++) {
    
    
        const submission = submissions[i];
        const learner_id = submission.learner_id;
        const assignment_id = submission.assignment_id;
        const sub = submission.submission;
        
    
    
        let assignment = null;
        let j = 0; 
        while (j < ag.assignments.length) {
          if (ag.assignments[j].id === assignment_id) {
            assignment = ag.assignments[j]; // This is the asignment we're loking for.
            break;  // when I found the assigment i want, I break my loop for assigments.
          }
              j++
        }
         if(!learners[learner_id]){
        learners[learner_id] = {
          id: learner_id,
          avg: 0,
          assignments: {},
          score:0,
          points:0,
        }
        };
    
    
        const learner = learners[learner_id];
    
        try {
          const pointsPossible = assignment.points_possible; 
          if (pointsPossible === 0) throw new Error("Points possible cannot be zero."); {
            let score = sub.score;// varibable for score
    
            if (new Date(sub.submitted_at) > new Date(assignment.due_at)) {
    
              score = score * 0.90;
            }
    
            const percentage = score / pointsPossible;
            learner.assignments[assignment_id] = percentage;
            learner.points += pointsPossible
            learner.score += score
            learner.avg = learner.score / learner.points
    
          }
        } catch (error) {
          console.error("Error processing submission:", error)
        }
    
      }
      console.table(learners)};
      const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
    
      console.table(result);
    

  //     const learnerIds = [...new Set(submissions.map(s => s.learner_id))];
  // const results = [];

  // for (let id of learnerIds) {
  //   const learnerResult = { id };
  //   let totalScore = 0;
  //   let totalPossible = 0;

  //   const learnerSubmissions = submissions.filter(s => s.learner_id === id);

  //   for (let submission of learnerSubmissions) {
  //     const assignmentId = submission.assignment_id;
  //     const assignment = assignmentLookup[assignmentId];
  //     if (!assignment) continue;

  //     const score = submission.submission.score;
  //     const submittedAt = new Date(submission.submission.submitted_at);
  //     const dueDate = assignment.due_at;

  //     // Ignore future-due assignments
  //     if (dueDate > new Date()) continue;

  //     let adjustedScore = score;

  //     // Apply 10% deduction if late
  //     if (submittedAt > dueDate) {
  //       adjustedScore = +(score - score * 0.1).toFixed(2);
  //     }

  //     const normalized = +(adjustedScore / assignment.points_possible).toFixed(3);
  //     learnerResult[assignmentId] = normalized;

  //     totalScore += adjustedScore;
  //     totalPossible += assignment.points_possible;
  //   }

  //   learnerResult.avg = totalPossible > 0
  //     ? +(totalScore / totalPossible).toFixed(3)
  //     : 0;

  //   results.push(learnerResult);
  // }

  // return results;
//}

  //   const result = [
  //     {
  //       id: 125,
  //       avg: 0.985, // (47 + 150) / (50 + 150)
  //       1: 0.94, // 47 / 50
  //       2: 1.0, // 150 / 150
  //     },
  //     {
  //       id: 132,
  //       avg: 0.82, // (39 + 125) / (50 + 150)
  //       1: 0.78, // 39 / 50
  //       2: 0.833, // late: (140 - 15) / 150
  //     },
  //   ];
  
  //   return result;
  // }
  

  