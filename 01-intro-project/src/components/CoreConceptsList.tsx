import coreConcept from "../types/types";
import CoreConcept from "./CoreConcept";

interface Props {
    coreConceptList: coreConcept[]
}

export default function CoreConceptsList(props: Props) {
    
    const {coreConceptList} = props
    
    return (
    <ul>
        {coreConceptList.map((coreConcept) => 
        <CoreConcept coreConcept={coreConcept} key={coreConcept.title}/>)}
    </ul>
    )
}