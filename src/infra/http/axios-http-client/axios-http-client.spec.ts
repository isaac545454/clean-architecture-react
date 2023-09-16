import { AxiosHttpClient } from "./axios-http-client"
import axios from 'axios'
import { mockdAxios } from "../test"
import { mockedPostRequest } from "@/data/test"

jest.mock("axios")


type SutTypes = {
    sut: AxiosHttpClient,
    mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
    const sut = new AxiosHttpClient()
    const mockedAxios = mockdAxios()

    return {
        mockedAxios,
        sut
    }
}

describe("AxiosHttpClient", () => {
    test("shold call axios with correct values", async () => {
        const request = mockedPostRequest()
        const { sut, mockedAxios } = makeSut()
        await sut.post(request)
        expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    test("shold return the correct statusCode and body", () => {
        const { sut, mockedAxios } = makeSut()
        const promise = sut.post(mockedPostRequest())
        expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })
})