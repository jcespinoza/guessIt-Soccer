﻿namespace GuessItSoccer.API.App_Start
{
    public class Encripter
    {
        const string key = "15Ther234!@#$*&^%Jahck";

        public static string Encrypt(string plainText)
        {
            return Encryptamajig.AesEncryptamajig.Encrypt(plainText, key);
        }

        public static string Decrypt(string cipherText)
        {
            return Encryptamajig.AesEncryptamajig.Decrypt(cipherText, key);
        }
    }
}