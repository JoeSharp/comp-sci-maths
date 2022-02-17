import React from 'react';
import cogoToast from "cogo-toast";

import Button from '../../Bootstrap/Buttons/Button';
import useListReducer from '../../lib/useListReducer';
import useSketch from '../../p5/useSketch';
import BearingSketch, { Bearing } from './BearingSketch';
import ConfirmDialog, { useDialog as useConfirmDialog } from '../../Bootstrap/ConfirmDialog';

const DEGREES = <span>&#176;</span>;

const bearingsToString = (bearings: Bearing[]): string => bearings.map(b => `${b.bearing}-${b.distance}`).join(',');
const bearingsFromString = (asStr: string): Bearing[] => asStr
    .split(',')
    .map(b => b.split('-'))
    .map(b => ({
        bearing: parseInt(b[0]),
        distance: parseInt(b[1])
    }));

const initialBearings: Bearing[] = [
    {
        bearing: 90,
        distance: 130,
    }, {
        bearing: 180,
        distance: 30,
    }, {
        bearing: 270,
        distance: 50,
    }, {
        bearing: 180,
        distance: 80,
    }, {
        bearing: 270,
        distance: 80,
    }, {
        bearing: 0,
        distance: 30,
    }, {
        bearing: 90,
        distance: 50,
    }, {
        bearing: 0,
        distance: 50,
    }, {
        bearing: 270,
        distance: 50,
    }, {
        bearing: 0,
        distance: 30
    }
]

const Bearings: React.FunctionComponent = () => {
    const { addItem, receiveItems, clearItems, items: bearings, removeItemAtIndex } = useListReducer<Bearing>(initialBearings);
    const [bearing, setBearing] = React.useState<number>(90);
    const [distance, setDistance] = React.useState<number>(50);

    const onBearingChange: React.ChangeEventHandler<HTMLInputElement> =
        React.useCallback(({ target: { value } }) => setBearing(parseInt(value)), [setBearing]);
    const onDistanceChange: React.ChangeEventHandler<HTMLInputElement> =
        React.useCallback(({ target: { value } }) => setDistance(parseInt(value)), [setDistance]);

    const onAddBearing = React.useCallback(() => addItem({ bearing, distance }), [bearing, distance, addItem]);

    const { updateConfig, refContainer } = useSketch(BearingSketch);

    React.useEffect(() => updateConfig({ bearings }), [bearings, updateConfig])

    const [exportString, setExportString] = React.useState('');

    React.useEffect(
        () => setExportString(bearingsToString(bearings)),
        [bearings, setExportString]);

    const onClickImport = React.useCallback(() => receiveItems(bearingsFromString(exportString)),
        [exportString, receiveItems])

    const exportStringRef = React.useRef<HTMLInputElement>(null);
    const onExportStringChange: React.ChangeEventHandler<HTMLInputElement> =
        React.useCallback(({ target: { value } }) => setExportString(value), [setExportString]);

    const { componentProps: confirmDialogProps, showDialog } = useConfirmDialog({ getQuestion: () => 'Are you sure you want to clear any existing values?', onConfirm: clearItems });

    const onClickExport = React.useCallback(() => {
        /* Select the text field */
        if (exportStringRef.current) {
            exportStringRef.current.select();
            exportStringRef.current.setSelectionRange(0, 99999); /*For mobile devices*/

            /* Copy the text inside the text field */
            document.execCommand("copy");

            /* Alert the copied text */
            cogoToast.info("Copied the text: " + exportStringRef.current.value);
        }
    }, [exportStringRef]);

    return (<div>
        <ConfirmDialog {...confirmDialogProps} />
        <div ref={refContainer} />

        <div className='form-group'>
            <label>Export/Import</label>
            <input ref={exportStringRef} className='form-control' value={exportString} onChange={onExportStringChange} />
            <Button onClick={onClickExport} text='Export' styleType='primary' />
            <Button className='ml-1' onClick={onClickImport} text='Import' styleType='danger' />
        </div>

        <div>
            <h3>New Line</h3>
            <div className='form-group'>
                <label htmlFor='txtBearing'>Bearing (x{DEGREES})</label>
                <input id='txtBearing' className='form-control' type='number' value={bearing} onChange={onBearingChange} />
            </div>
            <div className='form-group'>
                <label htmlFor='txtDistance'>Distance (pixels)</label>
                <input id='txtDistance' className='form-control' type='number' value={distance} onChange={onDistanceChange} />
            </div>
            <Button styleType='primary' onClick={onAddBearing} text='Add' />
            <Button className='ml-1' styleType='danger' onClick={showDialog} text='Clear All' />
        </div>

        <table className='table table-striped table-compact'>
            <thead>
                <tr>
                    <th>Bearing{DEGREES}</th>
                    <th>Distance (pixels)</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {bearings.map(({ bearing, distance }, i) => (<tr key={i}>
                    <td>{distance}</td>
                    <td>{bearing}{DEGREES}</td>
                    <td><Button styleType='danger' onClick={() => removeItemAtIndex(i)} text='Remove' /></td>
                </tr>))}
            </tbody>
        </table>
    </div>)
}

export default Bearings;