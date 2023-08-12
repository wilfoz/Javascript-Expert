import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import RickAndMortyBRL from "../../src/business/integrations/rickAndMortyBRL.js";
import RickAndMortyBRLAdapter from "../../src/business/adapters/rickAndMortyBRLAdapter.js";

describe("#RickAndMortyBRLAdapter", () => {
  beforeEach(() => jest.clearAllMocks());
  test("#getCharacters should be an adapter for RickAndMortyBRL.getCharactersJson", async () => {
    const brlIntegration = jest
      .spyOn(RickAndMortyBRL, RickAndMortyBRL.getCharactersFromJson.name)
      .mockResolvedValue([]);

    const result = await RickAndMortyBRLAdapter.getCharacters();
    expect(brlIntegration).toHaveBeenCalled();
  });
});
