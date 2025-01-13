"use client"
import Link from 'next/link';
import React, { useState } from 'react'

const Shorten = () => {
    const [userURL, setUserURL] = useState("");
    const [flyURL, setFlyURL] = useState("");
    const [isFly, setIsFly] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isCopied, setIsCopied] = useState("");

    const flyLink = () => {
        const isValidURL = (input) => {
            const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/;
            return urlPattern.test(input);
        };
        if (userURL !== "" && isValidURL(userURL)) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "url": userURL
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("/api/fly", requestOptions)
                .then(response => response.json())
                .then(result => {
                    setUserURL("");
                    setIsFly(true);
                    setFlyURL(`${process.env.NEXT_PUBLIC_HOST}${result.flyurl}`)
                    setErrorMessage("");//reset error message
                })
                .catch(error => {
                    setErrorMessage("Failed to shorten the URL. Please try again.");
                });
        }
        else {
            if (userURL === "") {
                setErrorMessage("Please Enter a URL, URL cannot be empty");
            }
            else {
                setErrorMessage("Enter a valid URL, it should look like this: `https://example.com/a-long-url`")
            }
        }
    }

    const flyAgain = () => {
        setIsFly(false);
        setIsCopied("");
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(flyURL)
            .then(() => {
                setIsCopied("Text copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy text: ", err);
                setIsCopied("Failed to copy text.");
            });
    };

    return (
        <div>
            <div className="card bg-[#1d1d2a]/75 rounded-[3.6rem] w-[75%] h-[22rem] mx-auto ">
                <div className='card-body justify-between mb-2 '>
                    <span className='flex flex-col gap-1 justify-center' >
                        <div className="card-title text-3xl px-2 font-bold ">Shorten a Long Link</div>
                        <div className="px-2">for absolutely Free</div>
                    </span>
                    <span className='flex flex-col px-2 gap-2' >
                        <label htmlFor="linkInput" className='card-title font-bold' >{!isFly ? "Paste your long link here" : "Your link is ready to fly!🛫"}</label>

                        {!isFly ? <input value={userURL} onChange={e => { setUserURL(e.target.value) }} id='linkInput' type="url" placeholder='https://example.com/a-long-url' className='linkInput bg-transparent flex-1 p-3 outline-none border border-base-100 rounded-lg hover:border-primary' /> : <button onClick={copyToClipboard} className="btn text-xl border border-base-100 rounded-lg hover:border-primary">{flyURL}</button>}

                        {errorMessage && (
                            <div className="text-red-500 mt-2">{errorMessage}</div>
                        )}

                        {isCopied && (
                            <div className="text-green-500 mt-2">{isCopied}</div>
                        )}

                        {!isFly ? <button onClick={flyLink} className='btn btn-outline font-bold flex flex-col justify-center items-center mt-2 rounded-2xl w-56 text-base'><img src="/URL-BORDERD.gif" className='w-5' /><span>Fly your link for free</span></button> : <button onClick={flyAgain} className='btn btn-outline font-bold flex flex-col justify-center items-center mt-2 rounded-2xl w-56 text-base'><img src="/URL-BORDERD.gif" className='w-5' /><span>Fly your links again?</span></button>}
                    </span>
                </div>
            </div>


        </div>
    )
}

export default Shorten
