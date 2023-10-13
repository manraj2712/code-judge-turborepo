import { ProblemHeader } from '@/types/problem';


export default function ProblemHeaderComponent({header}: {header: ProblemHeader}){
    return (
        <div>
            <h1 className='text-xl font-bold mb-2'>{header.title}</h1>

            <div className = "flex justify-between mb-5">

                <p style={{color: getColorByDifficulty(header.difficulty), fontWeight: 700}}>
                    {header.difficulty}
                </p>

                <p>
                    {`Acceptance: ${header.acceptancePercentage}%`}
                </p>

                <p>
                    {`Submissions: ${header.submissionsCount}`}
                </p>
            </div>
        </div>
    )
}


function getColorByDifficulty(difficulty: string) : string {
    switch(difficulty){
        case "hard":
            return 'red';
        default:
            return 'green';
    }
}