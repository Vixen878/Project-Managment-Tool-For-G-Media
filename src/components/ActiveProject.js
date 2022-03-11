import { useParams } from "react-router-dom"
import { UseDocument } from "../hooks/useDocument"
import BoardWrapper from "../components/BoardWrapper"
import { UseColumns } from "../hooks/UseColumns";
import { UseCards } from "../hooks/UseCards";
import { doc, setDoc, Timestamp, deleteDoc, updateDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";

import { v4 as uuidv4 } from 'uuid';
import Chat from "./Chat";
import { toast } from "react-toastify";

import React from 'react'

function ActiveProject() {
    const { id } = useParams()
    const { document, error } = UseDocument('projects', id)

    const { columns } = UseColumns("boards", id)
    const { cards } = UseCards("cards", ["projectId", "==", id])

    if (error) {
        return <div className="text-red-900">{error}</div>
    }

    if (!columns) {
        return <div>Loading...</div>
    }

    if (columns !== null && cards !== null) {
        let boardData = {
            columns: []
        }

        let colId = 1;
        let cardId = 1;
        columns.forEach(col => {
            boardData.columns.push({
                id: colId,
                key: col.id,
                title: col.title,
                cards: []
            })

            cards.filter(c => c.colId === col.id).forEach(card => {
                boardData.columns[colId - 1].cards.push({
                    id: cardId,
                    key: card.id,
                    title: card.title,
                    description: card.description,
                    cardInfo: card
                })

                cardId++;
            })

            colId++;
        });

        async function cancelProject() {
            try {
                updateDoc(doc(db, "projects", id), {
                    cancellationRequested: true
                })

                updateDoc(doc(db, "requests", id), {
                    cancellationRequested: true
                })

                const notificationRef = doc(collection(db, "notifications"));
                try {
                    await setDoc(notificationRef, {
                        content: 'A client has requested to cancel their project',
                        id: notificationRef.id,
                        is_read: false,
                        relative_link: `/project/${id}`,
                        user_target: document.cid,
                        role_target: ['admin']
                    });
                } catch (err) {
                    console.log(err.message)
                }

                toast.success("You have requested a cancellation for this project")
            } catch (ex) {
                toast.error(`Error ocurred: ${ex}`)
            }
        }

        return (
            <div className="h-full">
                <div className="flex">
                    <div className="flex w-3/4">
                        <span className='text-4xl'>{document.name}</span>
                        <div className="flex-1"></div>
                        {!document?.isCompleted && !document.cancellationRequested &&
                            <span className="rounded border border-red-600 p-3 font-semibold text-black hover:bg-red-700 hover:text-white cursor-pointer right"
                                onClick={() => { if (window.confirm("Are you sure you want to request a project cancellation?")) cancelProject() }}>
                                Request project cancellation
                            </span>}
                    </div>
                    <div className="w-1/4"></div>
                </div>
                <div className="flex h-full">
                    <div className="w-3/4 relative pt-3">
                        {!document.cancellationRequested &&
                            <React.Fragment>
                                {document?.isCompleted &&
                                    <div className="absolute h-full w-full flex items-center justify-center backdrop-blur-md">
                                        <span className="text-green-700 text-2xl">Project completed</span>
                                    </div>
                                }
                                <BoardWrapper
                                    board={boardData}
                                    onNewCard={onNewCard}
                                    onRenameColumn={onRenameColumn}
                                    onRenameCard={onRenameCard}
                                    onRemoveCard={onRemoveCard}
                                    onColumnNew={onColumnNew}
                                    onColumnRemove={onColumnRemove}
                                    onCardDragEnd={onCardDragEnd} />
                            </React.Fragment>}
                        {document.cancellationRequested &&
                            <div className="flex flex-col justify-center items-center w-full h-full">
                                <div className="text-2xl">
                                    <span>You have requested for a project cancellation. Waiting for a response.</span>
                                </div>
                            </div>}
                    </div>
                    <div className="w-1/4 h-full mt-[-3%]">
                        <Chat id={id} project={document} />
                    </div>
                </div>
            </div>
        )
    }

    async function onNewCard(_, column, card) {
        let newCardId = uuidv4()

        await setDoc(doc(db, "boards", id, "columns", column.key, "cards", newCardId), {
            colId: column.key,
            description: card.description,
            id: newCardId,
            projectId: id,
            title: card.title,
            createdAt: Timestamp.fromDate(new Date()),
            position: column.cards.length
        })
    }

    async function onColumnNew(board, column) {
        let newColId = uuidv4()

        await setDoc(doc(db, "boards", id, "columns", newColId), {
            id: newColId,
            title: column.title,
            createdAt: Timestamp.fromDate(new Date()),
            position: board.columns.length
        })
    }

    async function onRenameCard(_, column, card) {
        await updateDoc(doc(db, "boards", id, "columns", column.key, "cards", card.key), {
            title: card.title,
            description: card.description
        })
    }

    async function onRenameColumn(_, column) {
        await updateDoc(doc(db, "boards", id, "columns", column.key), {
            title: column.title
        })
    }

    async function onRemoveCard(_, column, card) {
        await deleteDoc(doc(db, "boards", id, "columns", column.key, "cards", card.key))
    }

    async function onColumnRemove(_, column) {
        await deleteDoc(doc(db, "boards", id, "columns", column.key))
    }

    async function onCardDragEnd(board, card, source, destination) {
        // await delay(2000)

        if (source.fromColumnId !== destination.toColumnId) {
            await Promise.all([
                setDoc(doc(db, "boards", id, "columns", board.columns[destination.toColumnId - 1].key, "cards", card.key), {
                    ...card.cardInfo,
                    colId: board.columns[destination.toColumnId - 1].key
                }),
                deleteDoc(doc(db, "boards", id, "columns", card.cardInfo.colId, "cards", card.key))
            ])
        }

        for (let i = 0; i < board.columns.length; i++) {
            // console.log("col " + board.columns[i].title + " = " + i)
            await updateDoc(doc(db, "boards", id, "columns", board.columns[i].key), {
                position: i
            })

            for (let j = 0; j < board.columns[i].cards.length; j++) {
                // console.log("card " + board.columns[i].cards[j].title + " = " + j)

                await updateDoc(doc(db, "boards", id, "columns", board.columns[i].key, "cards", board.columns[i].cards[j].key), {
                    position: j
                })
            }
        }
    }

    return (
        <div></div>
    )
}

export default ActiveProject
