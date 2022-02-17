import cogoToast from 'cogo-toast';
import React from 'react';
import Button from '../../../Bootstrap/Buttons/Button';

import challenges from './challenges';

import './hrm.css'
import { HumanResourceMachineChallenge } from './types';

interface ChallengeWithCopyHandler extends HumanResourceMachineChallenge {
    onCopy: () => void;
    challengeId: string;
}

const getChallengeTextAreaId = (i: number) => `txtHrmChallenge${i}`

const HumanResourceMachine: React.FunctionComponent = () => {
    const challengesWithCopy: ChallengeWithCopyHandler[] = React.useMemo(() => challenges.map((challenge, i) => ({
        ...challenge,
        challengeId: getChallengeTextAreaId(i),
        onCopy: () => {
            /* Get the text field */
            var copyText: HTMLTextAreaElement = document.getElementById(getChallengeTextAreaId(i)) as HTMLTextAreaElement;

            /* Select the text field */
            copyText.select();
            copyText.setSelectionRange(0, 99999); /* For mobile devices */

            /* Copy the text inside the text field */
            document.execCommand("copy");

            /* Alert the copied text */
            cogoToast.info(`Copied HRM Solution to Clipboard for ${challenge.title}`)
        }
    })), [])

    return <table className='table table-bordered table-striped'>
        <thead>
            <tr>
                <th>Name</th>
                <th>Starting Position</th>
                <th className='hrm-solution-column'>Solution</th>
                <th>Copy</th>
            </tr>
        </thead>
        <tbody>
            {challengesWithCopy.map((challenge, i) => (<tr key={i}>
                <td>{challenge.title}</td>
                <td>{challenge.description}</td>
                <td className='hrm-solution-cell'>
                    <textarea id={challenge.challengeId} rows={challenge.solution.split('\n').length} readOnly value={challenge.solution}></textarea>
                </td>
                <td><Button text='copy' onClick={challenge.onCopy} styleType='light' /></td>
            </tr>))}
        </tbody>
    </table>
}

export default HumanResourceMachine;